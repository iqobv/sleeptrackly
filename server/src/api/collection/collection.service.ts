import { ImageService } from '@api/image/image.service';
import { Prisma } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { LanguageQueryDto } from '@libs/dto';
import { pickTranslation } from '@libs/mappers';
import { productInclude } from '@libs/prisma';
import { withField } from '@libs/utils';
import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { CreateCollectionDto, UpdateCollectionDto } from './dto';

const collectionInclude: Prisma.CollectionInclude = {
	translations: true,
	products: {
		include: {
			product: {
				include: productInclude('en'),
			},
		},
	},
};

@Injectable()
export class CollectionService {
	private readonly placeholderIconUrl = 'collections/placeholder.png';

	constructor(
		private readonly prismaService: PrismaService,
		private readonly imageService: ImageService,
	) {}

	async createCollection(dto: CreateCollectionDto, file: Express.Multer.File) {
		const { translations, productIds, ...rest } = dto;

		const iconImage = file
			? (await this.imageService.uploadImage(file, 'collections')).url
			: null;

		await this.validateProductIds(productIds || []);

		try {
			return await this.prismaService.collection.create({
				data: {
					...rest,
					iconUrl: iconImage || this.placeholderIconUrl,
					translations: {
						createMany: {
							data: translations,
							skipDuplicates: true,
						},
					},
					products: {
						createMany: {
							data: productIds.map((id) => ({ productId: id })),
							skipDuplicates: true,
						},
					},
				},
			});
		} catch (error) {
			this.throwSlugConflictException(error);
			throw error;
		}
	}

	async getCollectionById(id: string) {
		const collection = await this.prismaService.collection.findUnique({
			where: { id },
			include: collectionInclude,
		});

		if (!collection)
			throw new NotFoundException(ERROR_MESSAGES.COLLECTION.NOT_FOUND);

		return collection;
	}

	async getAllCollections() {
		return await this.prismaService.collection.findMany();
	}

	async getAllCollectionsForStore(query: LanguageQueryDto) {
		const { language = 'en' } = query;

		const collections = await this.prismaService.collection.findMany({
			where: { showInStore: true },
			select: {
				slug: true,
				translations: {
					where: { language: { in: [language, 'en'] } },
					select: { name: true, language: true },
				},
			},
		});

		const mappedCollections = collections
			.map((collection) => {
				const translation = pickTranslation(collection.translations, language);

				return {
					slug: collection.slug,
					name: translation?.name || 'No name',
				};
			})
			.sort((a, b) => a.name.localeCompare(b.name));

		return mappedCollections;
	}

	async updateCollection(
		id: string,
		dto: UpdateCollectionDto,
		file?: Express.Multer.File,
	) {
		const { translations, productIds, ...rest } = dto;

		const collection = await this.getCollectionById(id);

		let iconUrl: string | undefined;
		if (file) {
			iconUrl = (
				await this.imageService.uploadImage(
					file,
					'collections',
					collection.iconUrl,
					this.placeholderIconUrl,
				)
			).url;
		}

		const productsToDeleteIds = productIds
			? collection.products
					.filter((product) => !productIds.includes(product.productId))
					.map((product) => product.id)
			: [];

		const productsToAddIds = productIds
			? productIds.filter(
					(productId) =>
						!collection.products.some(
							(product) => product.productId === productId,
						),
				)
			: [];

		await this.validateProductIds(productIds || []);

		try {
			return await this.prismaService.collection.update({
				where: { id: collection.id },
				data: {
					...rest,
					...(iconUrl && { iconUrl }),
					...(translations && {
						translations: {
							deleteMany: { collectionId: id },
							createMany: {
								data: translations,
								skipDuplicates: true,
							},
						},
					}),
					...(productIds && {
						products: {
							deleteMany:
								productsToDeleteIds.length > 0
									? { id: { in: productsToDeleteIds } }
									: undefined,
							createMany:
								productsToAddIds.length > 0
									? {
											data: productsToAddIds.map((productId) => ({
												productId,
											})),
											skipDuplicates: true,
										}
									: undefined,
						},
					}),
				},
				include: collectionInclude,
			});
		} catch (error) {
			this.throwSlugConflictException(error);
			throw error;
		}
	}

	async deleteCollection(id: string) {
		const collection = await this.getCollectionById(id);

		if (collection.iconUrl !== this.placeholderIconUrl) {
			await this.imageService.deleteImage(collection.iconUrl);
		}

		await this.prismaService.collection.delete({
			where: { id },
		});

		return SUCCESS_MESSAGES.COLLECTION.DELETED;
	}

	private async validateProductIds(productIds: string[]) {
		const existingProducts = await this.prismaService.product.findMany({
			where: { id: { in: productIds } },
			select: { id: true },
		});

		const existingProductIds = existingProducts.map((product) => product.id);
		const invalidProductIds = productIds.filter(
			(id) => !existingProductIds.includes(id),
		);

		if (invalidProductIds.length > 0) {
			throw new BadRequestException(
				ERROR_MESSAGES.COLLECTION.PRODUCTS_NOT_FOUND,
			);
		}
	}

	private throwSlugConflictException(error: unknown) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				throw new ConflictException(
					withField(ERROR_MESSAGES.COLLECTION.SLUG_DUPLICATE, 'slug'),
				);
			}
		}
	}
}
