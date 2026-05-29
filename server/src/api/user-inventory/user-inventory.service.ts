import { Prisma, ProfileItemType } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { PaginationQueryWithLanguageDto } from '@libs/dto';
import { pickTranslation } from '@libs/mappers';
import { paginate } from '@libs/utils';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInventoryDto, UpdateUserInvetoryDto } from './dto';

@Injectable()
export class UserInventoryService {
	constructor(private readonly prismaService: PrismaService) {}

	async addItemToInventory(
		dto: CreateUserInventoryDto,
		tx?: Prisma.TransactionClient,
	) {
		const { userId, itemId, ...rest } = dto;

		const execute = async (client: Prisma.TransactionClient) => {
			return client.userInventory.create({
				data: {
					user: { connect: { id: userId } },
					item: { connect: { id: itemId } },
					...rest,
				},
			});
		};

		return tx ? execute(tx) : this.prismaService.$transaction(execute);
	}

	async bulkAddItemsToInventory(
		dtos: CreateUserInventoryDto[],
		tx?: Prisma.TransactionClient,
	) {
		const execute = async (client: Prisma.TransactionClient) => {
			return client.userInventory.createManyAndReturn({
				data: dtos,
				skipDuplicates: true,
			});
		};

		return tx ? execute(tx) : this.prismaService.$transaction(execute);
	}

	async getUserInventory(
		userId: string,
		query: PaginationQueryWithLanguageDto,
	) {
		const { language = 'en', page = 1, limit = 20 } = query;

		return await paginate({ page, limit }, async (take, skip) => {
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
				const translation = pickTranslation(ui.item.translations, language);
				const { translations, ...rest } = ui.item;

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
	}

	async getUserEquippedItems(userId: string) {
		return await this.prismaService.userInventory.findMany({
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
	}

	async equipItem(userId: string, itemId: string) {
		return await this.prismaService.$transaction(async (tx) => {
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
	}

	async updateUserInventoryItem(
		id: string,
		userId: string,
		dto: UpdateUserInvetoryDto,
	) {
		return await this.prismaService.$transaction(async (tx) => {
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
	}

	async removeItem(userId: string, id: string) {
		const userInventoryItem = await this.findById(id, userId);

		await this.prismaService.userInventory.delete({
			where: { id: userInventoryItem.id },
		});

		return SUCCESS_MESSAGES.USER_INVENTORY.DELETED;
	}

	async findById(id: string, userId: string, language: string = 'en') {
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

		return userInventoryItem;
	}

	async getOwnedItemIds(
		userId: string,
		itemIds: string[],
		tx?: Prisma.TransactionClient,
	) {
		const execute = async (client: Prisma.TransactionClient) => {
			return await client.userInventory.findMany({
				where: {
					userId,
					itemId: { in: itemIds },
				},
				select: { itemId: true },
			});
		};

		return tx ? execute(tx) : this.prismaService.$transaction(execute);
	}
}
