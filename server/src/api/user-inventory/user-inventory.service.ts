import { Prisma, ProfileItemType } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
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

		const execute = async (client: Prisma.TransactionClient) =>
			await client.userInventory.create({
				data: {
					user: { connect: { id: dto.userId } },
					item: { connect: { id: dto.itemId } },
					...rest,
				},
			});

		if (tx) return await execute(tx);

		return await this.prismaService.$transaction(async (client) => {
			return await execute(client);
		});
	}

	async bulkAddItemsToInventory(
		dtos: CreateUserInventoryDto[],
		tx?: Prisma.TransactionClient,
	) {
		const execute = async (client: Prisma.TransactionClient) =>
			await client.userInventory.createManyAndReturn({
				data: dtos,
				skipDuplicates: true,
			});

		if (tx) return await execute(tx);

		return await this.prismaService.$transaction(async (client) => {
			return await execute(client);
		});
	}

	async getUserInventory(
		userId: string,
		query: PaginationQueryWithLanguageDto,
	) {
		const { language = 'en', page = 1, limit = 20 } = query;

		return await paginate({ page, limit }, async (limit, offset) => {
			const [total, items] = await this.prismaService.$transaction([
				this.prismaService.userInventory.count({
					where: { userId },
				}),
				this.prismaService.userInventory.findMany({
					where: { userId },
					skip: offset,
					take: limit,
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
				const translation = pickTranslation(
					ui.item.translations,
					language ?? 'en',
				);

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
		const userInventoryItem = await this.findById(itemId, userId);

		let isEquipped = true;

		const alreadyEquippedItem =
			await this.prismaService.userInventory.findFirst({
				where: {
					userId,
					isEquipped: true,
					item: {
						type: userInventoryItem.item.type,
						AND: { type: { not: 'BADGE' } },
					},
				},
				include: { item: true },
			});

		const avatars: ProfileItemType[] = ['ANIMATED_AVATAR', 'AVATAR'];

		if (avatars.includes(userInventoryItem.item.type)) {
			const equippedItem = await this.prismaService.userInventory.findFirst({
				where: {
					userId,
					isEquipped: true,
					item: {
						type: { in: avatars },
					},
				},
			});

			if (!equippedItem) return;

			await this.prismaService.userInventory.update({
				where: { id: equippedItem.id, userId },
				data: { isEquipped: false },
			});
		}

		if (alreadyEquippedItem) {
			if (alreadyEquippedItem.id === userInventoryItem.id) {
				isEquipped = false;
			} else {
				await this.prismaService.userInventory.update({
					where: { id: alreadyEquippedItem.id, userId },
					data: { isEquipped: false },
				});
			}
		}

		return await this.prismaService.userInventory.update({
			where: { id: userInventoryItem.id, userId },
			data: { isEquipped },
		});
	}

	async updateUserInventoryItem(
		id: string,
		userId: string,
		dto: UpdateUserInvetoryDto,
	) {
		const { isEquipped } = dto;

		const userInventoryItem = await this.findById(id, userId);

		const alreadyEquippedItem = isEquipped
			? await this.prismaService.userInventory.findFirst({
					where: {
						userId,
						isEquipped: true,
						item: {
							type: userInventoryItem.item.type,
							AND: { type: { not: 'BADGE' } },
						},
					},
				})
			: null;

		if (alreadyEquippedItem) {
			await this.prismaService.userInventory.update({
				where: {
					id: alreadyEquippedItem.id,
					userId,
				},
				data: { isEquipped: false },
			});
		}

		return await this.prismaService.userInventory.update({
			where: { id: userInventoryItem.id, userId },
			data: { ...dto },
		});
	}

	async removeItem(userId: string, id: string) {
		const userInventoryItem = await this.findById(id, userId);

		await this.prismaService.userInventory.delete({
			where: { id: userInventoryItem.id, userId },
		});

		return true;
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
			throw new NotFoundException('User inventory item not found');

		return userInventoryItem;
	}

	async getOwnedItemIds(
		userId: string,
		itemIds: string[],
		tx?: Prisma.TransactionClient,
	) {
		const execute = async (client: Prisma.TransactionClient) => {
			const ownedItems = await client.userInventory.findMany({
				where: {
					userId,
					itemId: { in: itemIds },
				},
				include: {
					item: true,
				},
			});

			return ownedItems;
		};

		if (tx) return await execute(tx);

		return await this.prismaService.$transaction(
			async (client) => await execute(client),
		);
	}
}
