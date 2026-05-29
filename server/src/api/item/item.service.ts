import { ImageService } from '@api/image/image.service';
import { Prisma } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { R2Service } from '@infra/r2/r2.service';
import { ERROR_MESSAGES } from '@libs/constants';
import { PaginationQueryDto } from '@libs/dto';
import { paginate } from '@libs/utils';
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { CreateItemDto, UpdateItemDto } from './dto';
import { CreateItemFiles, UpdateItemFiles } from './types';

@Injectable()
export class ItemService {
	private readonly PLACEHOLDER_IMAGE_URL = 'defaults/placeholder.webp';

	constructor(
		private readonly prismaService: PrismaService,
		private readonly r2Service: R2Service,
		private readonly imageService: ImageService,
	) {}

	async createItem(dto: CreateItemDto, files: CreateItemFiles) {
		const { translations, ...rest } = dto;

		if (!files.media)
			throw new BadRequestException(ERROR_MESSAGES.ITEM.IMAGE_REQUIRED);

		const mediaFile = await this.imageService.uploadImage(
			files.media[0],
			'items',
			null,
			this.PLACEHOLDER_IMAGE_URL,
		);

		const previewFile = await this.imageService.uploadImage(
			files.preview[0],
			'previews',
			null,
			this.PLACEHOLDER_IMAGE_URL,
		);

		const item = await this.prismaService.item.create({
			data: {
				...rest,
				mediaUrl: mediaFile.url,
				previewUrl: previewFile.url,
				isAnimated: mediaFile.isAnimated,
				translations: {
					create: translations,
				},
			},
		});

		return item;
	}

	async getAllItems(query: PaginationQueryDto) {
		const { page = 1, limit = 20 } = query;

		return await paginate({ page, limit }, async (limit, offset) => {
			const [total, items] = await this.prismaService.$transaction([
				this.prismaService.item.count(),
				this.prismaService.item.findMany({
					skip: offset,
					take: limit,
					orderBy: {
						createdAt: 'desc',
					},
					include: {
						translations: true,
					},
				}),
			]);

			return { items, total };
		});
	}

	async getAllAvailableItems(query: PaginationQueryDto) {
		const { page = 1, limit = 20 } = query;

		const where: Prisma.ItemWhereInput = {
			products: { is: null },
		};

		return await paginate({ page, limit }, async (limit, offset) => {
			const [total, items] = await this.prismaService.$transaction([
				this.prismaService.item.count({ where }),
				this.prismaService.item.findMany({
					where,
					skip: offset,
					take: limit,
					orderBy: {
						createdAt: 'desc',
					},
					include: {
						translations: true,
					},
				}),
			]);

			return { items, total };
		});
	}

	async getById(id: string) {
		const item = await this.prismaService.item.findUnique({
			where: { id },
			include: {
				translations: true,
			},
		});

		if (!item) throw new NotFoundException(ERROR_MESSAGES.ITEM.NOT_FOUND);

		return item;
	}

	async updateItem(id: string, dto: UpdateItemDto, files?: UpdateItemFiles) {
		const { translations, ...rest } = dto;

		const item = await this.getById(id);

		return await this.prismaService.$transaction(
			async (tx) => {
				const mediaFile = files?.media
					? await this.imageService.uploadImage(
							files.media[0],
							'items',
							item.mediaUrl,
							this.PLACEHOLDER_IMAGE_URL,
						)
					: null;

				const previewFile = files?.preview
					? await this.imageService.uploadImage(
							files.preview[0],
							'previews',
							item.previewUrl,
							this.PLACEHOLDER_IMAGE_URL,
						)
					: null;

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

				await tx.item.update({
					where: { id },
					data: {
						...rest,
						mediaUrl: mediaFile?.url ?? item.mediaUrl,
						previewUrl: previewFile?.url ?? item.previewUrl,
					},
					include: {
						translations: true,
					},
				});

				return await tx.item.findUnique({
					where: { id },
					include: {
						translations: true,
					},
				});
			},
			{
				maxWait: 5000,
				timeout: 20000,
			},
		);
	}

	async deleteItem(id: string) {
		const item = await this.getById(id);

		await this.prismaService.item.delete({
			where: { id: item.id },
		});

		return { message: 'Item deleted successfully' };
	}
}
