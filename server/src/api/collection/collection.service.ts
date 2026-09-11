import { ImageService } from '@api/image/image.service';
import { Prisma } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { DEFAULT_URLS } from '@libs/constants/default-urls.constants';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';
import { PaginationQueryDto } from '@libs/dto/pagination-query.dto';
import { collectionInclude } from '@libs/prisma/collection.include.prisma';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import { paginate } from '@libs/utils/pagination.util';
import { withField } from '@libs/utils/with-field.util';
import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {
	CollectionDto,
	FullCollectionDto,
	PaginatedCollectionsDto,
} from './dto/collection.dto';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Injectable()
export class CollectionService {
	private readonly placeholderIconUrl = 'collections/placeholder.png';

	constructor(
		private readonly prismaService: PrismaService,
		private readonly imageService: ImageService,
	) {}

	public async createCollection(
		dto: CreateCollectionDto,
		file: Express.Multer.File,
	): Promise<CollectionDto> {
		const { translations, productIds, ...rest } = dto;

		const iconImage = file
			? (
					await this.imageService.uploadImage({
						file,
						folder: 'collections',
						placeholderUrl: DEFAULT_URLS.COLLECTION_ICON,
					})
				).url
			: null;

		await this.validateProductIds(productIds || []);

		try {
			const result = await this.prismaService.collection.create({
				data: {
					...rest,
					iconUrl: iconImage || DEFAULT_URLS.COLLECTION_ICON,
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

			return plainToInstance(CollectionDto, result);
		} catch (error) {
			this.throwSlugConflictException(error);
			throw error;
		}
	}

	public async getCollectionById(id: string): Promise<FullCollectionDto> {
		const collection = await this.prismaService.collection.findUnique({
			where: { id },
			include: collectionInclude(),
		});

		if (!collection)
			throw new NotFoundException(ERROR_MESSAGES.COLLECTION.NOT_FOUND);

		return plainToInstance(FullCollectionDto, collection);
	}

	public async getAllCollections(
		query: PaginationQueryDto,
	): Promise<PaginatedCollectionsDto> {
		const result = await paginate(query, async (limit, offset) => {
			const [items, total] = await this.prismaService.$transaction([
				this.prismaService.collection.findMany({
					include: collectionInclude(),
					orderBy: { createdAt: 'desc' },
					skip: offset,
					take: limit,
				}),
				this.prismaService.collection.count(),
			]);

			return { items, total };
		});

		return plainToInstance(PaginatedCollectionsDto, result);
	}

	public async updateCollection(
		id: string,
		dto: UpdateCollectionDto,
		file?: Express.Multer.File,
	): Promise<FullCollectionDto> {
		const { translations, productIds, ...rest } = dto;

		const collection = await this.getCollectionById(id);

		let iconUrl: string | undefined;
		if (file) {
			iconUrl = (
				await this.imageService.uploadImage({
					file,
					folder: 'collections',
					placeholderUrl: DEFAULT_URLS.COLLECTION_ICON,
					oldUrl: collection.iconUrl,
				})
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
			const updated = await this.prismaService.collection.update({
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
				include: collectionInclude(),
			});

			return plainToInstance(FullCollectionDto, updated);
		} catch (error) {
			this.throwSlugConflictException(error);
			throw error;
		}
	}

	public async deleteCollection(id: string): Promise<MessageResponse> {
		const collection = await this.getCollectionById(id);

		if (collection.iconUrl !== this.placeholderIconUrl) {
			await this.imageService.deleteImage(collection.iconUrl);
		}

		await this.prismaService.collection.delete({
			where: { id },
		});

		return SUCCESS_MESSAGES.COLLECTION.DELETED;
	}

	private async validateProductIds(productIds: string[]): Promise<void> {
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

	private throwSlugConflictException(error: unknown): void {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				throw new ConflictException(
					withField(ERROR_MESSAGES.COLLECTION.SLUG_DUPLICATE, 'slug'),
				);
			}
		}
	}
}
