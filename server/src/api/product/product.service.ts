import { ProductType, ProfileItemType } from '@generated/prisma/enums';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';
import { PaginationQueryWithLanguageDto } from '@libs/dto/pagination-language-query.dto';
import { productInclude } from '@libs/prisma/product.include.prisma';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import { paginate } from '@libs/utils/pagination.util';
import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateProductDto } from './dto/create-product.dto';
import { PaginatedFullProductDto } from './dto/paginated-product.dto';
import { FullProductDto, ProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
	constructor(private readonly prismaService: PrismaService) {}

	public async createProduct(dto: CreateProductDto): Promise<ProductDto> {
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

		return plainToInstance(ProductDto, product);
	}

	public async getProductById(id: string): Promise<FullProductDto> {
		const product = await this.prismaService.product.findUnique({
			where: { id },
			include: productInclude(),
		});

		if (!product) throw new NotFoundException(ERROR_MESSAGES.PRODUCT.NOT_FOUND);

		return plainToInstance(FullProductDto, product);
	}

	public async getAllProducts(
		query: PaginationQueryWithLanguageDto,
	): Promise<PaginatedFullProductDto> {
		const { language = 'en', limit = 20, page = 1 } = query;

		const result = await paginate({ page, limit }, async (limit, offset) => {
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

		return plainToInstance(PaginatedFullProductDto, result);
	}

	public async updateProduct(
		id: string,
		dto: UpdateProductDto,
	): Promise<ProductDto> {
		const product = await this.getProductById(id);

		const updated = await this.prismaService.product.update({
			where: { id: product.id },
			data: { ...dto },
		});

		return plainToInstance(ProductDto, updated);
	}

	public async removeProduct(id: string): Promise<MessageResponse> {
		const product = await this.getProductById(id);

		await this.prismaService.product.delete({
			where: { id: product.id },
		});

		return SUCCESS_MESSAGES.PRODUCT.DELETED;
	}

	private calculateBundlePrice(price: number, percent: number): number {
		const multiplier = 1 - percent / 100;
		const result = price * multiplier;

		return result;
	}
}
