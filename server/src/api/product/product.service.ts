import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { ProductType, ProfileItemType } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { PaginationQueryWithLanguageDto } from 'src/libs/dto';
import { productInclude } from 'src/libs/prisma';
import { paginate } from 'src/libs/utils';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductService {
	constructor(private readonly prismaService: PrismaService) {}

	async createProduct(dto: CreateProductDto) {
		const { itemId, bundleId, price, expiresAt, ...rest } = dto;

		if (!itemId && !bundleId)
			throw new BadRequestException(
				'Either itemId or bundleId must be provided',
			);

		if (itemId && bundleId)
			throw new BadRequestException(
				'Both itemId and bundleId cannot be provided simultaneously',
			);

		if (expiresAt && new Date(expiresAt).getTime() < Date.now())
			throw new BadRequestException('expiresAt must be a future date');

		let type: ProductType;
		let itemType: ProfileItemType | null = null;
		let finalPrice: number;

		const item = itemId
			? await this.prismaService.item.findUnique({
					where: { id: itemId },
				})
			: null;

		const bundle = bundleId
			? await this.prismaService.bundle.findFirst({
					where: { id: bundleId },
				})
			: null;

		if (item) {
			type = ProductType.ITEM;
			itemType = item.type;
			finalPrice = price ? price : item.basePrice;
		} else if (bundle) {
			type = ProductType.BUNDLE;
			itemType = null;
			finalPrice = price
				? price
				: Math.round(
						this.calculateBundlePrice(
							bundle.basePrice,
							bundle.discountPercentage,
						),
					);
		} else {
			throw new BadRequestException(
				'Either itemId or bundleId must be provided',
			);
		}

		const product = await this.prismaService.product.create({
			data: {
				type,
				itemType,
				price: finalPrice,
				expiresAt,
				...(item && { item: { connect: { id: item.id } } }),
				...(bundle && { bundle: { connect: { id: bundle.id } } }),
				...rest,
			},
		});

		return product;
	}

	async getProductById(id: string) {
		const product = await this.prismaService.product.findUnique({
			where: { id },
			include: {
				item: {
					include: { translations: true },
				},
				bundle: {
					include: {
						translations: true,
						items: {
							include: {
								item: {
									include: {
										translations: true,
									},
								},
							},
						},
					},
				},
			},
		});

		if (!product) throw new NotFoundException('Product not found');

		return product;
	}

	async getAllProducts(query: PaginationQueryWithLanguageDto) {
		const { language = 'en', limit = 20, page = 1 } = query;

		return await paginate({ page, limit }, async (limit, offset) => {
			return await this.prismaService.$transaction(async (tx) => {
				const total = await tx.product.count();
				const products = await tx.product.findMany({
					skip: offset,
					take: limit,
					orderBy: {
						createdAt: 'desc',
					},
					include: productInclude(language),
				});

				return { total, items: products };
			});
		});
	}

	async updateProduct(id: string, dto: UpdateProductDto) {
		const product = await this.getProductById(id);

		return await this.prismaService.product.update({
			where: { id: product.id },
			data: { ...dto },
		});
	}

	async removeProduct(id: string) {
		const product = await this.getProductById(id);

		await this.prismaService.product.delete({
			where: { id: product.id },
		});

		return true;
	}

	private calculateBundlePrice(price: number, percent: number) {
		const multiplier = 1 - percent / 100;
		const result = price * multiplier;
		return result;
	}
}
