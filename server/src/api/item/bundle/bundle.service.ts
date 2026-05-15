import { Prisma } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { R2Service } from '@infra/r2/r2.service';
import { PaginationQueryDto } from '@libs/dto';
import { bundleInclude } from '@libs/prisma';
import { paginate } from '@libs/utils';
import {
	BadRequestException,
	forwardRef,
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { ItemService } from '../item.service';
import { CreateBundleDto, UpdateBundleDto } from './dto';

@Injectable()
export class BundleService {
	private readonly PLACEHOLDER_IMAGE_URL = 'defaults/placeholder.webp';

	constructor(
		private readonly prismaService: PrismaService,
		@Inject(forwardRef(() => ItemService))
		private readonly itemService: ItemService,
		private readonly r2Service: R2Service,
	) {}

	async createBundle(dto: CreateBundleDto, file: Express.Multer.File) {
		const { translations, itemsIds, ...rest } = dto;

		if (!file) throw new BadRequestException('Bundle image is required');

		const price = await this.prismaService.item.aggregate({
			where: { id: { in: itemsIds } },
			_sum: {
				basePrice: true,
			},
		});

		const finalPrice = Math.round(price._sum.basePrice ?? 0);

		const mediaFile = await this.itemService.uploadImage(file, 'bundles', null);

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

	async getAllAvailableItems(query: PaginationQueryDto) {
		const { page = 1, limit = 20 } = query;

		const where: Prisma.BundleWhereInput = {
			products: { is: null },
		};

		return await paginate({ page, limit }, async (limit, offset) => {
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

	async updateBundle(
		id: string,
		dto: UpdateBundleDto,
		file?: Express.Multer.File,
	) {
		const { translations, itemsIds, ...rest } = dto;

		return await this.prismaService.$transaction(
			async (tx) => {
				const bundle = await this.getById(id);

				const mediaFile = file
					? await this.itemService.uploadImage(file, 'bundles', bundle.mediaUrl)
					: null;

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

				await tx.bundle.update({
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
				});

				return await tx.bundle.findUnique({
					where: { id: bundle.id },
					include: {
						items: true,
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

	async removeBundle(id: string) {
		return await this.prismaService.bundle.delete({
			where: { id },
		});
	}
}
