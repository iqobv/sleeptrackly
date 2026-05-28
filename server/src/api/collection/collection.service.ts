import { ImageService } from '@api/image/image.service';
import { Prisma } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import {
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { CreateCollectionDto, UpdateCollectionDto } from './dto';

const collectionInclude: Prisma.CollectionInclude = {
	translations: true,
	items: {
		include: {
			product: true,
		},
	},
};

@Injectable()
export class CollectionService {
	private readonly placeholderImageUrl = '/collections/placeholder.png';

	constructor(
		private readonly prismaService: PrismaService,
		private readonly imageService: ImageService,
	) {}

	async createCollection(dto: CreateCollectionDto, file: Express.Multer.File) {
		const { translations, productIds, ...rest } = dto;

		const backgroundImageUrl = file
			? (await this.imageService.uploadImage(file, 'collections')).url
			: this.placeholderImageUrl;

		try {
			return await this.prismaService.collection.create({
				data: {
					...rest,
					backgroundImage: backgroundImageUrl,
					translations: {
						createMany: {
							data: translations,
							skipDuplicates: true,
						},
					},
					items: {
						createMany: {
							data: productIds.map((id) => ({ productId: id })),
							skipDuplicates: true,
						},
					},
				},
			});
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new ConflictException(
						'Collection with this slug already exists',
					);
				}
			}
			throw error;
		}
	}

	async getCollectionById(id: string) {
		const collection = await this.prismaService.collection.findUnique({
			where: { id },
			include: collectionInclude,
		});

		if (!collection) throw new NotFoundException('Collection not found');

		return collection;
	}

	async getAllCollections() {
		return await this.prismaService.collection.findMany();
	}

	async getAllCollectionsForStore() {
		return await this.prismaService.collection.findMany({
			where: { showInStore: true },
		});
	}

	async updateCollection(
		id: string,
		dto: UpdateCollectionDto,
		file?: Express.Multer.File,
	) {
		const { translations, productIds, ...rest } = dto;

		const collection = await this.getCollectionById(id);

		let backgroundImageUrl: string | undefined;
		if (file) {
			backgroundImageUrl = (
				await this.imageService.uploadImage(
					file,
					'collections',
					collection.backgroundImage,
					this.placeholderImageUrl,
				)
			).url;
		}

		const itemsToDeleteIds = productIds
			? collection.items
					.filter((item) => !productIds.includes(item.productId))
					.map((item) => item.id)
			: [];

		const itemsToAddIds = productIds
			? productIds.filter(
					(productId) =>
						!collection.items.some((item) => item.productId === productId),
				)
			: [];

		try {
			return await this.prismaService.collection.update({
				where: { id: collection.id },
				data: {
					...rest,
					...(backgroundImageUrl && { backgroundImage: backgroundImageUrl }),
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
						items: {
							deleteMany:
								itemsToDeleteIds.length > 0
									? { id: { in: itemsToDeleteIds } }
									: undefined,
							createMany:
								itemsToAddIds.length > 0
									? {
											data: itemsToAddIds.map((productId) => ({
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
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new ConflictException(
						'Collection with this slug already exists',
					);
				}
			}
			throw error;
		}
	}

	async deleteCollection(id: string) {
		const collection = await this.getCollectionById(id);

		if (collection.backgroundImage !== this.placeholderImageUrl) {
			await this.imageService.deleteImage(collection.backgroundImage);
		}

		await this.prismaService.collection.delete({
			where: { id },
		});

		return { message: 'Collection deleted successfully' };
	}
}
