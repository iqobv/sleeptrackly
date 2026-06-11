import { ImageService } from '@api/image/image.service';
import { Prisma } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { DEFAULT_URLS } from '@libs/constants/default-urls.constants';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';
import { PaginationQueryDto } from '@libs/dto/pagination-query.dto';
import { bundleInclude } from '@libs/prisma/bundle.include.prisma';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import { paginate } from '@libs/utils/pagination.util';
import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BaseBundleDto, BundleDto } from './dto/bundle-response.dto';
import { CreateBundleDto } from './dto/create-bundle.dto';
import {
	PaginatedAvailableBundlesDto,
	PaginatedFullBundlesDto,
} from './dto/paginated-bundles.dto';
import { UpdateBundleDto } from './dto/update-bundle.dto';

@Injectable()
export class BundleService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly imageService: ImageService,
	) {}

	public async createBundle(
		dto: CreateBundleDto,
		file: Express.Multer.File,
	): Promise<BaseBundleDto> {
		const { translations, itemsIds, ...rest } = dto;

		const price = await this.prismaService.item.aggregate({
			where: { id: { in: itemsIds } },
			_sum: {
				basePrice: true,
			},
		});

		const finalPrice = Math.round(price._sum.basePrice ?? 0);

		const mediaFile = await this.imageService.uploadImage({
			file,
			folder: 'bundles',
			oldUrl: null,
			placeholderUrl: DEFAULT_URLS.BUNDLE,
			options: {
				width: 800,
				height: 800,
				fit: 'cover',
				quality: 80,
			},
		});

		const bundle = await this.prismaService.bundle.create({
			data: {
				mediaUrl: mediaFile.url,
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
		});

		return plainToInstance(BaseBundleDto, bundle);
	}

	public async getAllBundles(
		query: PaginationQueryDto,
	): Promise<PaginatedFullBundlesDto> {
		const { page = 1, limit = 20 } = query;

		const result = await paginate({ page, limit }, async (limit, offset) => {
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

		return plainToInstance(PaginatedFullBundlesDto, result);
	}

	public async getAllAvailableItems(
		query: PaginationQueryDto,
	): Promise<PaginatedAvailableBundlesDto> {
		const { page = 1, limit = 20 } = query;

		const where: Prisma.BundleWhereInput = {
			products: { is: null },
		};

		const result = await paginate({ page, limit }, async (limit, offset) => {
			const [total, items] = await this.prismaService.$transaction([
				this.prismaService.bundle.count({ where }),
				this.prismaService.bundle.findMany({
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

		return plainToInstance(PaginatedAvailableBundlesDto, result);
	}

	public async getById(id: string): Promise<BundleDto> {
		const bundle = await this.prismaService.bundle.findUnique({
			where: { id },
			include: bundleInclude,
		});

		if (!bundle) throw new NotFoundException(ERROR_MESSAGES.BUNDLE.NOT_FOUND);

		return plainToInstance(BundleDto, bundle);
	}

	public async updateBundle(
		id: string,
		dto: UpdateBundleDto,
		file?: Express.Multer.File,
	): Promise<BundleDto> {
		const { translations, itemsIds, ...rest } = dto;

		const bundle = await this.getById(id);

		const mediaFile = file
			? await this.imageService.uploadImage({
					file,
					folder: 'bundles',
					oldUrl: bundle.mediaUrl,
					placeholderUrl: DEFAULT_URLS.BUNDLE,
					options: {
						width: 800,
						height: 800,
						fit: 'cover',
						quality: 80,
					},
				})
			: null;

		return await this.prismaService.$transaction(
			async (tx) => {
				if (translations && translations.length > 0) {
					const translationPromises = translations.map((translation) =>
						tx.bundleTranslation.upsert({
							where: {
								bundleId_language: {
									bundleId: bundle.id,
									language: translation.language,
								},
							},
							create: {
								...translation,
								bundleId: bundle.id,
							},
							update: {
								name: translation.name,
							},
						}),
					);

					await Promise.all(translationPromises);
				}

				if (itemsIds && itemsIds.length > 0) {
					await tx.itemInBundle.deleteMany({
						where: { bundleId: bundle.id },
					});
				}

				const updated = await tx.bundle.update({
					where: { id: bundle.id },
					data: {
						...rest,
						mediaUrl: mediaFile ? mediaFile.url : undefined,
						items: itemsIds
							? {
									create: itemsIds.map((itemId: string) => ({
										itemId: itemId,
									})),
								}
							: undefined,
					},
					include: bundleInclude,
				});

				return plainToInstance(BundleDto, updated);
			},
			{
				maxWait: 5000,
				timeout: 20000,
			},
		);
	}

	public async removeBundle(id: string): Promise<MessageResponse> {
		const bundle = await this.getById(id);

		await this.prismaService.bundle.delete({
			where: { id: bundle.id },
		});

		return SUCCESS_MESSAGES.BUNDLE.DELETED;
	}
}
