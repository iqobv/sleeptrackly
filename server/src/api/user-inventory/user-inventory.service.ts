import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { mapTranslation } from 'src/libs/mappers';
import {
	CreateUserInventoryDto,
	QueryUserInventoryDto,
	UpdateUserInvetoryDto,
} from './dto';

@Injectable()
export class UserInventoryService {
	constructor(private readonly prismaService: PrismaService) {}

	async addItemToInventory(dto: CreateUserInventoryDto) {
		const { userId, itemId, ...rest } = dto;

		return await this.prismaService.userInventory.create({
			data: {
				user: { connect: { id: dto.userId } },
				item: { connect: { id: dto.itemId } },
				...rest,
			},
		});
	}

	async bulkAddItemsToInventory(dtos: CreateUserInventoryDto[]) {
		return await this.prismaService.userInventory.createManyAndReturn({
			data: dtos,
			skipDuplicates: true,
		});
	}

	async getUserInventory(userId: string, query: QueryUserInventoryDto) {
		const { language, page = 1, limit = 20 } = query;

		const safePage = Math.max(Number(page), 1);
		const safeSize = Math.max(Number(limit), 1);
		const offset = (safePage - 1) * safeSize;

		const [total, items] = await this.prismaService.$transaction([
			this.prismaService.userInventory.count({
				where: { userId },
			}),
			this.prismaService.userInventory.findMany({
				where: { userId },
				skip: offset,
				take: safeSize,
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
			const translation = mapTranslation(
				ui.item.translations,
				language ?? 'en',
			);

			const { translations, ...rest } = ui.item;

			return {
				...ui,
				item: {
					...rest,
					name: translation ? translation.name : null,
				},
			};
		});

		return {
			items: mappedItems,
			meta: {
				total,
				page: safePage,
				pageSize: safeSize,
				totalPages: Math.ceil(total / safeSize),
			},
		};
	}

	async updateUserInventoryItem(
		id: string,
		userId: string,
		dto: UpdateUserInvetoryDto,
	) {
		const userInventoryItem = await this.findById(id, userId);

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
}
