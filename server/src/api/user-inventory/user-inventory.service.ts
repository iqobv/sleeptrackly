import { Prisma, ProfileItemType } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { PaginationQueryWithLanguageDto } from '@libs/dto';
import { pickTranslation } from '@libs/mappers';
import { MessageResponse } from '@libs/types';
import { paginate } from '@libs/utils';
import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {
	CreateUserInventoryDto,
	FullUserInventoryItemDto,
	PaginatedUserInventoryDto,
	UpdateUserInvetoryDto,
	UserEquippedItemDto,
	UserInventoryDto,
	UserInventoryItemDto,
} from './dto';
import { OwnedItem } from './interfaces';

@Injectable()
export class UserInventoryService {
	constructor(private readonly prismaService: PrismaService) {}

	public async addItemToInventory(
		dto: CreateUserInventoryDto,
		tx?: Prisma.TransactionClient,
	): Promise<UserInventoryDto> {
		const { userId, itemId, ...rest } = dto;

		const execute = async (
			client: Prisma.TransactionClient,
		): Promise<UserInventoryDto> => {
			return await client.userInventory.create({
				data: {
					user: { connect: { id: userId } },
					item: { connect: { id: itemId } },
					...rest,
				},
			});
		};

		const result = tx
			? await execute(tx)
			: await this.prismaService.$transaction(execute);

		return plainToInstance(UserInventoryDto, result);
	}

	public async bulkAddItemsToInventory(
		dtos: CreateUserInventoryDto[],
		tx?: Prisma.TransactionClient,
	): Promise<UserInventoryDto[]> {
		const execute = async (
			client: Prisma.TransactionClient,
		): Promise<UserInventoryDto[]> => {
			return client.userInventory.createManyAndReturn({
				data: dtos,
				skipDuplicates: true,
			});
		};

		const result = tx
			? await execute(tx)
			: await this.prismaService.$transaction(execute);

		return plainToInstance(UserInventoryDto, result);
	}

	public async getUserInventory(
		userId: string,
		query: PaginationQueryWithLanguageDto,
	): Promise<PaginatedUserInventoryDto> {
		const { language = 'en', page = 1, limit = 20 } = query;

		const result = await paginate({ page, limit }, async (take, skip) => {
			const [total, items] = await this.prismaService.$transaction([
				this.prismaService.userInventory.count({
					where: { userId },
				}),
				this.prismaService.userInventory.findMany({
					where: { userId },
					skip,
					take,
					orderBy: {
						createdAt: 'desc',
					},
					include: {
						item: {
							include: {
								translations: {
									where: { language: { in: [language, 'en'] } },
								},
							},
						},
					},
				}),
			]);

			const mappedItems = items.map((ui) => {
				const { translations, ...rest } = ui.item;

				const translation = pickTranslation(translations, language);

				return {
					...ui,
					item: {
						...rest,
						translation,
					},
				};
			});

			return {
				items: mappedItems,
				total,
			};
		});

		return plainToInstance(PaginatedUserInventoryDto, result);
	}

	public async getUserEquippedItems(
		userId: string,
	): Promise<UserEquippedItemDto[]> {
		const items = await this.prismaService.userInventory.findMany({
			where: { userId, isEquipped: true },
			select: {
				id: true,
				item: {
					select: {
						id: true,
						type: true,
						mediaUrl: true,
						isAnimated: true,
					},
				},
			},
		});

		return plainToInstance(UserEquippedItemDto, items);
	}

	public async equipItem(
		userId: string,
		itemId: string,
	): Promise<UserInventoryItemDto> {
		const result = await this.prismaService.$transaction(async (tx) => {
			const userInventoryItem = await tx.userInventory.findFirst({
				where: { id: itemId, userId },
				include: { item: true },
			});

			if (!userInventoryItem)
				throw new NotFoundException(
					ERROR_MESSAGES.USER_INVENTORY.USER_INVENTORY_ITEM_NOT_FOUND,
				);

			const targetType = userInventoryItem.item.type;

			if (targetType === 'BADGE') {
				return tx.userInventory.update({
					where: { id: userInventoryItem.id },
					data: { isEquipped: !userInventoryItem.isEquipped },
				});
			}

			const isAvatar =
				targetType === 'AVATAR' || targetType === 'ANIMATED_AVATAR';
			const typesToUnequip = isAvatar
				? ['AVATAR', 'ANIMATED_AVATAR']
				: [targetType];

			const currentlyEquipped = await tx.userInventory.findMany({
				where: {
					userId,
					isEquipped: true,
					item: { type: { in: typesToUnequip as ProfileItemType[] } },
				},
			});

			const isTogglingOff = currentlyEquipped.some(
				(item) => item.id === userInventoryItem.id,
			);

			if (currentlyEquipped.length > 0) {
				await tx.userInventory.updateMany({
					where: { id: { in: currentlyEquipped.map((item) => item.id) } },
					data: { isEquipped: false },
				});
			}

			return await tx.userInventory.update({
				where: { id: userInventoryItem.id },
				data: { isEquipped: !isTogglingOff },
			});
		});

		return plainToInstance(UserInventoryItemDto, result);
	}

	public async updateUserInventoryItem(
		id: string,
		userId: string,
		dto: UpdateUserInvetoryDto,
	): Promise<UserInventoryItemDto> {
		const result = await this.prismaService.$transaction(async (tx) => {
			const userInventoryItem = await tx.userInventory.findFirst({
				where: { id, userId },
				include: { item: true },
			});

			if (!userInventoryItem)
				throw new NotFoundException(
					ERROR_MESSAGES.USER_INVENTORY.USER_INVENTORY_ITEM_NOT_FOUND,
				);

			if (dto.isEquipped && userInventoryItem.item.type !== 'BADGE') {
				await tx.userInventory.updateMany({
					where: {
						userId,
						isEquipped: true,
						item: { type: userInventoryItem.item.type },
					},
					data: { isEquipped: false },
				});
			}

			return await tx.userInventory.update({
				where: { id: userInventoryItem.id },
				data: dto,
			});
		});

		return plainToInstance(UserInventoryItemDto, result);
	}

	public async removeItem(
		userId: string,
		id: string,
	): Promise<MessageResponse> {
		const userInventoryItem = await this.findById(id, userId);

		await this.prismaService.userInventory.delete({
			where: { id: userInventoryItem.id },
		});

		return SUCCESS_MESSAGES.USER_INVENTORY.DELETED;
	}

	public async findById(
		id: string,
		userId: string,
		language: string = 'en',
	): Promise<FullUserInventoryItemDto> {
		const userInventoryItem = await this.prismaService.userInventory.findFirst({
			where: { id, userId },
			include: {
				item: {
					include: {
						translations: {
							where: { language: { in: [language, 'en'] } },
						},
					},
				},
			},
		});

		if (!userInventoryItem)
			throw new NotFoundException(
				ERROR_MESSAGES.USER_INVENTORY.USER_INVENTORY_ITEM_NOT_FOUND,
			);

		return plainToInstance(FullUserInventoryItemDto, userInventoryItem);
	}

	public async getOwnedItemIds(
		userId: string,
		itemIds: string[],
		tx?: Prisma.TransactionClient,
	): Promise<OwnedItem[]> {
		const execute = async (
			client: Prisma.TransactionClient,
		): Promise<OwnedItem[]> => {
			return await client.userInventory.findMany({
				where: {
					userId,
					itemId: { in: itemIds },
				},
				select: { itemId: true },
			});
		};

		return tx
			? await execute(tx)
			: await this.prismaService.$transaction(execute);
	}
}
