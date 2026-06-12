import { ImageService } from '@api/image/image.service';
import { Prisma } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { DEFAULT_URLS } from '@libs/constants/default-urls.constants';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';
import { PaginationQueryDto } from '@libs/dto/pagination-query.dto';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import { paginate } from '@libs/utils/pagination.util';
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateItemDto } from './dto/create-item.dto';
import { FullItemDto, ItemDto } from './dto/item-response.dto';
import { FullPaginatedItemsDto } from './dto/paginated-items.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { CreateItemFiles } from './types/create-item-files.types';
import { UpdateItemFiles } from './types/update-item-files.types';

@Injectable()
export class ItemService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly imageService: ImageService,
	) {}

	public async createItem(
		dto: CreateItemDto,
		files: CreateItemFiles,
	): Promise<ItemDto> {
		const { translations, ...rest } = dto;

		if (!files.media)
			throw new BadRequestException(ERROR_MESSAGES.ITEM.IMAGE_REQUIRED);

		const mediaFile = await this.imageService.uploadImage({
			file: files.media[0],
			folder: 'items',
			oldUrl: null,
			placeholderUrl: DEFAULT_URLS.ITEM,
		});

		const previewFile = await this.imageService.uploadImage({
			file: files.preview[0],
			folder: 'previews',
			oldUrl: null,
			placeholderUrl: DEFAULT_URLS.ITEM_PREVIEW,
		});

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

		return plainToInstance(ItemDto, item);
	}

	public async getAllItems(
		query: PaginationQueryDto,
	): Promise<FullPaginatedItemsDto> {
		const { page = 1, limit = 20 } = query;

		const result = await paginate({ page, limit }, async (limit, offset) => {
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

		return plainToInstance(FullPaginatedItemsDto, result);
	}

	public async getAllAvailableItems(
		query: PaginationQueryDto,
	): Promise<FullPaginatedItemsDto> {
		const { page = 1, limit = 20 } = query;

		const where: Prisma.ItemWhereInput = {
			products: { is: null },
		};

		const result = await paginate({ page, limit }, async (limit, offset) => {
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

		return plainToInstance(FullPaginatedItemsDto, result);
	}

	public async getById(id: string): Promise<FullItemDto> {
		const item = await this.prismaService.item.findUnique({
			where: { id },
			include: {
				translations: true,
			},
		});

		if (!item) throw new NotFoundException(ERROR_MESSAGES.ITEM.NOT_FOUND);

		return plainToInstance(FullItemDto, item);
	}

	public async updateItem(
		id: string,
		dto: UpdateItemDto,
		files?: UpdateItemFiles,
	): Promise<FullItemDto> {
		const { translations, ...rest } = dto;

		const item = await this.getById(id);
		const mediaFile = files?.media
			? await this.imageService.uploadImage({
					file: files.media[0],
					folder: 'items',
					oldUrl: item.mediaUrl,
					placeholderUrl: DEFAULT_URLS.ITEM,
				})
			: null;

		const previewFile = files?.preview
			? await this.imageService.uploadImage({
					file: files.preview[0],
					folder: 'items',
					oldUrl: item.previewUrl,
					placeholderUrl: DEFAULT_URLS.ITEM_PREVIEW,
				})
			: null;

		return await this.prismaService.$transaction(
			async (tx) => {
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

				const updated = await tx.item.update({
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

				return plainToInstance(FullItemDto, updated);
			},
			{
				maxWait: 5000,
				timeout: 20000,
			},
		);
	}

	public async deleteItem(id: string): Promise<MessageResponse> {
		const item = await this.getById(id);

		await this.prismaService.item.delete({
			where: { id: item.id },
		});

		return SUCCESS_MESSAGES.ITEM.DELETED;
	}
}
