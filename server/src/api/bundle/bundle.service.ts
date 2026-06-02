import { ImageService } from '@api/image/image.service';
import { Prisma } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { PaginationQueryDto } from '@libs/dto';
import { bundleInclude } from '@libs/prisma';
import { MessageResponse } from '@libs/types';
import { paginate } from '@libs/utils';
import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {
	BaseBundleDto,
	CreateBundleDto,
	FullBundleDto,
	PaginatedAvailableBundlesDto,
	PaginatedFullBundlesDto,
	UpdateBundleDto,
} from './dto';

@Injectable()
export class BundleService {
	private readonly PLACEHOLDER_IMAGE_URL = 'defaults/placeholder.webp';

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

		const mediaFile = await this.imageService.uploadImage(
			file,
			'bundles',
			null,
			this.PLACEHOLDER_IMAGE_URL,
		);

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

	public async getById(id: string): Promise<FullBundleDto> {
		const bundle = await this.prismaService.bundle.findUnique({
			where: { id },
			include: bundleInclude,
		});

		if (!bundle) throw new NotFoundException(ERROR_MESSAGES.BUNDLE.NOT_FOUND);

		return plainToInstance(FullBundleDto, bundle);
	}

	public async updateBundle(
		id: string,
		dto: UpdateBundleDto,
		file?: Express.Multer.File,
	): Promise<FullBundleDto> {
		const { translations, itemsIds, ...rest } = dto;

		const bundle = await this.getById(id);

		const mediaFile = file
			? await this.imageService.uploadImage(
					file,
					'bundles',
					bundle.mediaUrl,
					this.PLACEHOLDER_IMAGE_URL,
				)
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

				return plainToInstance(FullBundleDto, updated);
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
