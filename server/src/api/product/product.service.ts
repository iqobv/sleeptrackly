import { ProductType, ProfileItemType } from '@generated/prisma/enums';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES } from '@libs/constants';
import { PaginationQueryWithLanguageDto } from '@libs/dto';
import { productInclude } from '@libs/prisma';
import { paginate } from '@libs/utils';
import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductService {
	constructor(private readonly prismaService: PrismaService) {}

	async createProduct(dto: CreateProductDto) {
		const { itemId, bundleId, price, expiresAt, ...rest } = dto;

		if (!itemId && !bundleId)
			throw new BadRequestException(
				ERROR_MESSAGES.PRODUCT.REQUIRED_PAYLOAD_MISSING,
			);

		if (itemId && bundleId)
			throw new BadRequestException(
				ERROR_MESSAGES.PRODUCT.MUTUALLY_EXCLUSIVE_PAYLOAD,
			);

		if (expiresAt && new Date(expiresAt).getTime() < Date.now())
			throw new BadRequestException(
				ERROR_MESSAGES.PRODUCT.EXPIRES_AT_INVALID_FUTURE,
			);

		const alreadyExists = await this.prismaService.product.findFirst({
			where: {
				AND: [
					{ itemId: itemId ? itemId : null },
					{ bundleId: bundleId ? bundleId : null },
				],
			},
		});

		if (alreadyExists)
			throw new ConflictException(ERROR_MESSAGES.PRODUCT.ALREADY_EXISTS);

		let type: ProductType;
		let itemType: ProfileItemType | null;
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
				ERROR_MESSAGES.PRODUCT.REQUIRED_PAYLOAD_MISSING,
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

		if (!product) throw new NotFoundException(ERROR_MESSAGES.PRODUCT.NOT_FOUND);

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

		return { message: 'Product removed successfully' };
	}

	private calculateBundlePrice(price: number, percent: number) {
		const multiplier = 1 - percent / 100;
		const result = price * multiplier;
		return result;
	}
}
