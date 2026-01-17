import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import sharp from 'sharp';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { R2Service } from 'src/infra/r2/r2.service';
import { PaginationQueryDto } from 'src/libs/dto';
import { bundleInclude } from 'src/libs/prisma';
import { paginate } from 'src/libs/utils';
import { v4 as uuidv4 } from 'uuid';
import { CreateBundleDto, UpdateBundleDto } from './dto';

@Injectable()
export class BundleService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly r2Service: R2Service,
	) {}

	async createBundle(dto: CreateBundleDto) {
		const { translations, itemsIds, ...rest } = dto;

		const price = await this.prismaService.item.aggregate({
			where: { id: { in: itemsIds } },
			_sum: {
				basePrice: true,
			},
		});

		const finalPrice = Math.round(price._sum.basePrice ?? 0);

		const bundle = await this.prismaService.bundle.create({
			data: {
				basePrice: finalPrice,
				...rest,
				translations: {
					create: translations,
				},
				items: {
					create: itemsIds.map((id) => ({
						item: { connect: { id } },
					})),
				},
			},
			include: {
				items: true,
				translations: true,
			},
		});

		return bundle;
	}

	async getAllBundles(query: PaginationQueryDto) {
		const { page = 1, limit = 20 } = query;

		return await paginate({ page, limit }, async (limit, offset) => {
			const [total, bundles] = await this.prismaService.$transaction([
				this.prismaService.bundle.count(),
				this.prismaService.bundle.findMany({
					skip: offset,
					take: limit,
					orderBy: {
						createdAt: 'desc',
					},
					include: bundleInclude,
				}),
			]);

			return {
				items: bundles,
				total,
			};
		});
	}

	async getById(id: string) {
		const bundle = await this.prismaService.bundle.findFirst({
			where: {
				id,
			},
			include: bundleInclude,
		});

		if (!bundle) throw new NotFoundException('Bundle not found');

		return bundle;
	}

	async updateBundle(id: string, dto: UpdateBundleDto) {
		const { translations, ...rest } = dto;

		return await this.prismaService.$transaction(async (tx) => {
			if (translations && translations.length > 0) {
				const translationPromises = translations.map((translation) =>
					tx.bundleTranslation.upsert({
						where: {
							bundleId_language: {
								bundleId: id,
								language: translation.language,
							},
						},
						create: {
							...translation,
							bundleId: id,
						},
						update: {
							name: translation.name,
						},
					}),
				);

				await Promise.all(translationPromises);
			}

			return await tx.bundle.update({
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

	async removeBundle(id: string) {
		return await this.prismaService.bundle.delete({
			where: { id },
		});
	}

	async uploadBundleImage(file: Express.Multer.File, bundleId: string) {
		const bundle = await this.prismaService.bundle.findUnique({
			where: { id: bundleId },
		});

		if (!bundle) {
			throw new NotFoundException('Bundle not found');
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

		if (bundle.mediaUrl) {
			try {
				await this.r2Service.delete(bundle.mediaUrl);
			} catch (e) {
				console.error('Delete old file error:', e);
			}
		}

		const filename = `${uuidv4()}.webp`;
		const key = `bundles/${filename}`;

		const uploadResult = await this.r2Service.upload(
			processedBuffer,
			key,
			'image/webp',
		);

		return await this.prismaService.bundle.update({
			where: { id: bundleId },
			data: {
				mediaUrl: uploadResult.key,
			},
		});
	}
}
