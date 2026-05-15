import { Prisma } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { R2Service } from '@infra/r2/r2.service';
import { PaginationQueryDto } from '@libs/dto';
import { paginate } from '@libs/utils';
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { CreateItemDto, UpdateItemDto } from './dto';
import { CreateItemFiles, UpdateItemFiles } from './types';

@Injectable()
export class ItemService {
	private readonly PLACEHOLDER_IMAGE_URL = 'defaults/placeholder.webp';

	constructor(
		private readonly prismaService: PrismaService,
		private readonly r2Service: R2Service,
	) {}

	async createItem(dto: CreateItemDto, files: CreateItemFiles) {
		const { translations, ...rest } = dto;

		if (!files.media) throw new BadRequestException('Item image is required');

		const mediaFile = await this.uploadImage(files.media[0], 'items', null);

		const previewFile = await this.uploadImage(
			files.preview[0],
			'previews',
			null,
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

	async uploadImage(
		file: Express.Multer.File,
		folder: string = 'items',
		oldUrl: string | null = null,
	) {
		const isVideo = file.mimetype.startsWith('video/');
		let processedBuffer: Buffer = file.buffer;
		let contentType: string = file.mimetype;
		let extension: string = file.originalname.split('.').pop() || '';

		if (!isVideo) {
			try {
				const pipeline = sharp(file.buffer, { animated: true });

				processedBuffer = await pipeline
					.webp({ quality: 80, effort: 6, lossless: false })
					.toBuffer();
				contentType = 'image/webp';
				extension = 'webp';
			} catch (error) {
				console.error('Sharp error:', error);
				throw new BadRequestException('Failed to process image');
			}
		}

		if (oldUrl && oldUrl !== this.PLACEHOLDER_IMAGE_URL) {
			try {
				await this.r2Service.delete(oldUrl);
			} catch (e) {
				console.error('Delete old file error:', e);
			}
		}

		const filename = `${uuidv4()}.${extension}`;
		const key = `${folder}/${filename}`;

		const uploadResult = await this.r2Service.upload(
			processedBuffer,
			key,
			contentType,
		);

		return {
			url: uploadResult.key,
			isAnimated: isVideo,
			extension,
		};
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
		const item = await this.prismaService.item.findFirst({
			where: {
				id,
			},
			include: {
				translations: true,
			},
		});

		if (!item) throw new NotFoundException('Item not found');

		return item;
	}

	async updateItem(id: string, dto: UpdateItemDto, files?: UpdateItemFiles) {
		const { translations, ...rest } = dto;

		return await this.prismaService.$transaction(
			async (tx) => {
				const item = await tx.item.findUnique({
					where: { id },
				});

				if (!item) {
					throw new NotFoundException('Item not found');
				}

				const mediaFile = files?.media
					? await this.uploadImage(files.media[0], 'items', item.mediaUrl)
					: null;

				const previewFile = files?.preview
					? await this.uploadImage(
							files.preview[0],
							'previews',
							item.previewUrl,
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
		return await this.prismaService.item.delete({
			where: { id },
		});
	}
}
