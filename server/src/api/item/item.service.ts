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
	constructor(
		private readonly prismaService: PrismaService,
		private readonly r2Service: R2Service,
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

		let processedBuffer: Buffer;
		try {
			const pipeline = sharp(file.buffer, { animated: true });

			processedBuffer = await pipeline
				.webp({ quality: 80, effort: 6, lossless: false })
				.toBuffer();
		} catch (error) {
			console.error('Sharp error:', error);
			throw new BadRequestException('Failed to process image');
		}

		if (item.mediaUrl) {
			try {
				await this.r2Service.delete(item.mediaUrl);
			} catch (e) {
				console.error('Delete old file error:', e);
			}
		}

		const filename = `${uuidv4()}.webp`;
		const key = `items/${filename}`;

		const uploadResult = await this.r2Service.upload(
			processedBuffer,
			key,
			'image/webp',
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
