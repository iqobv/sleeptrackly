import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import sharp from 'sharp';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { R2Service } from 'src/infra/r2/r2.service';
import { PaginationQueryDto } from 'src/libs/dto';
import { paginate } from 'src/libs/utils';
import { v4 as uuidv4 } from 'uuid';
import { CreateItemDto, UpdateItemDto } from './dto';

@Injectable()
export class ItemService {
	private readonly PLACEHOLDER_IMAGE_URL = 'defaults/placeholder.webp';

	constructor(
		private readonly prismaService: PrismaService,
		private readonly r2Service: R2Service,
	) {}

	async createItem(dto: CreateItemDto, file: Express.Multer.File) {
		const { translations, ...rest } = dto;

		if (!file) throw new BadRequestException('Item image is required');

		const item = await this.prismaService.item.create({
			data: {
				...rest,
				mediaUrl: this.PLACEHOLDER_IMAGE_URL,
				translations: {
					create: translations,
				},
			},
		});

		if (file && item) {
			await this.uploadItemImage(file, item.id);
		}

		return item;
	}

	async uploadItemImage(file: Express.Multer.File, itemId: string) {
		const item = await this.prismaService.item.findUnique({
			where: { id: itemId },
		});

		if (!item) {
			throw new NotFoundException('Item not found');
		}

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

		if (item.mediaUrl && item.mediaUrl !== this.PLACEHOLDER_IMAGE_URL) {
			try {
				await this.r2Service.delete(item.mediaUrl);
			} catch (e) {
				console.error('Delete old file error:', e);
			}
		}

		const filename = `${uuidv4()}.${extension}`;
		const key = `items/${filename}`;

		const uploadResult = await this.r2Service.upload(
			processedBuffer,
			key,
			contentType,
		);

		return await this.prismaService.item.update({
			where: { id: itemId },
			data: {
				mediaUrl: uploadResult.key,
			},
		});
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
