import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { bundleSelect, BundleWithTranslations } from 'src/libs/prisma';
import { BundleQueryDto, CreateBundleDto, UpdateBundleDto } from './dto';

@Injectable()
export class BundleService {
	constructor(private readonly prismaService: PrismaService) {}

	async createBundle(dto: CreateBundleDto) {
		const { translations, itemsIds, ...rest } = dto;

		const bundle = await this.prismaService.bundle.create({
			data: {
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

	async getAllBundles(query: BundleQueryDto) {
		const { language, page = 1, limit = 20 } = query;

		const safePage = Math.max(Number(page), 1);
		const safeSize = Math.max(Number(limit), 1);
		const offset = (safePage - 1) * safeSize;

		const [total, bundles] = await this.prismaService.$transaction([
			this.prismaService.bundle.count({
				where: {
					isShowInStore: true,
				},
			}),
			this.prismaService.bundle.findMany({
				where: {
					isShowInStore: true,
				},
				skip: offset,
				take: safeSize,
				orderBy: {
					createdAt: 'desc',
				},
				include: bundleSelect(language),
			}),
		]);

		const mappedBundles = bundles.map((bundle) =>
			this.mapBundle(bundle, language),
		);

		return {
			items: mappedBundles,
			meta: {
				total,
				page: safePage,
				pageSize: safeSize,
				totalPages: Math.ceil(total / safeSize),
			},
		};
	}

	async getById(id: string, language: string) {
		const bundle = await this.prismaService.bundle.findFirst({
			where: {
				id,
				isShowInStore: true,
			},
			include: bundleSelect(language),
		});

		if (!bundle) throw new NotFoundException('Bundle not found');

		return this.mapBundle(bundle, language);
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

	private mapBundle(bundle: BundleWithTranslations, language: string) {
		const { translations, ...rest } = bundle;

		const translation = this.mapTranslation(translations, language);

		return {
			...rest,
			name: translation ? translation.name : null,
			items: bundle.items.map((bi) => {
				const { translations, ...itemRest } = bi.item;
				const itemTranslation = this.mapTranslation(translations, language);
				return {
					...itemRest,
					name: itemTranslation ? itemTranslation.name : null,
				};
			}),
		};
	}

	private mapTranslation<T extends { language: string }>(
		items: T[],
		language: string,
	): T | undefined {
		return (
			items.find((t) => t.language === language) ||
			items.find((t) => t.language === 'en')
		);
	}
}
