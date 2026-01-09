import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CloudinaryService } from 'src/infra/cloudinary/cloudinary.service';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { CreateItemDto, QueryItemDto, UpdateItemDto } from './dto';

@Injectable()
export class ItemService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly cloudinaryService: CloudinaryService,
	) {}

	async createItem(dto: CreateItemDto) {
		const { translations, ...rest } = dto;

		return await this.prismaService.item.create({
			data: {
				...rest,
				translations: {
					create: translations,
				},
			},
		});
	}

	async uploadItemImage(file: Express.Multer.File, itemId: string) {
		const item = await this.prismaService.item.findUnique({
			where: { id: itemId },
		});

		if (!item) {
			throw new NotFoundException('Item not found');
		}

		const filename = randomUUID();
		file.filename = filename;

		const uploadResult = await this.cloudinaryService.uploadFile(file, {
			folder: 'items',
			public_id: itemId,
			filename_override: filename,
		});

		if (!uploadResult.secure_url) return;

		const url = `${uploadResult.public_id}.${uploadResult.format}`;

		if (!url) return;

		return await this.prismaService.item.update({
			where: { id: itemId },
			data: {
				mediaUrl: url,
			},
		});
	}

	async getAllItems(query: QueryItemDto) {
		const { language, page = 1, limit = 20 } = query;

		const safePage = Math.max(Number(page), 1);
		const safeSize = Math.max(Number(limit), 1);
		const offset = (safePage - 1) * safeSize;

		const [total, items] = await this.prismaService.$transaction([
			this.prismaService.item.count({
				where: {
					isShowInStore: true,
				},
			}),
			this.prismaService.item.findMany({
				where: {
					isShowInStore: true,
				},
				skip: offset,
				take: safeSize,
				orderBy: {
					createdAt: 'desc',
				},
				include: {
					translations: {
						where: { language: { in: [language, 'en'] } },
					},
				},
			}),
		]);

		const mappedItems = items.map((item) => {
			const translation =
				item.translations.find((t) => t.language === language) ||
				item.translations.find((t) => t.language === 'en');

			const { translations, ...rest } = item;

			return {
				...rest,
				name: translation ? translation.name : null,
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

	async getById(id: string, language: string) {
		const item = await this.prismaService.item.findFirst({
			where: {
				id,
				isShowInStore: true,
			},
			include: {
				translations: {
					where: { language: { in: [language, 'en'] } },
				},
			},
		});

		if (!item) throw new NotFoundException('Item not found');

		const translation =
			item.translations.find((t) => t.language === language) ||
			item.translations.find((t) => t.language === 'en');

		const { translations, ...rest } = item;

		return {
			...rest,
			name: translation ? translation.name : null,
		};
	}

	async updateItem(id: string, dto: UpdateItemDto) {
		const { translations, ...rest } = dto;

		return await this.prismaService.$transaction(async (tx) => {
			if (translations && translations.length > 0) {
				const translationPromises = translations.map((translation) =>
					tx.itemTranslation.upsert({
						where: {
							itemId_language: {
								itemId: id,
								language: translation.language,
							},
						},
						create: {
							...translation,
							itemId: id,
						},
						update: {
							name: translation.name,
						},
					}),
				);

				await Promise.all(translationPromises);
			}

			return await tx.item.update({
				where: { id },
				data: {
					...rest,
				},
				include: {
					translations: true,
				},
			});
		});
	}

	async deleteItem(id: string) {
		return await this.prismaService.item.delete({
			where: { id },
		});
	}
}
