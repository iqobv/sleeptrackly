import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { MessageResponse } from '@libs/types';
import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ProductService } from '../product/product.service';
import { CreatePromotionDto, PromotionDto, UpdatePromotionDto } from './dto';

@Injectable()
export class PromotionService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly productService: ProductService,
	) {}

	public async createPromotion(dto: CreatePromotionDto): Promise<PromotionDto> {
		const { alias, coinsReward, expiresAt, maxUses, productIdReward } = dto;

		if (!coinsReward && !productIdReward) {
			throw new BadRequestException(
				ERROR_MESSAGES.PROMOTION.PRODUCT_REQUIRED_PAYLOAD_MISSING,
			);
		}

		let finalAlias: string;

		if (productIdReward) {
			await this.productService.getProductById(productIdReward);
		}

		if (alias) {
			finalAlias = alias;
			const existingPromotion = await this.prismaService.promotion.findUnique({
				where: { alias: finalAlias },
			});
			if (existingPromotion) {
				throw new ConflictException(ERROR_MESSAGES.PROMOTION.ALREADY_EXISTS);
			}
		} else {
			let attempts = 0;
			let isUnique = false;
			finalAlias = Math.random().toString(36).substring(2, 16);

			while (attempts < 5 && !isUnique) {
				const existingPromotion = await this.prismaService.promotion.findUnique(
					{
						where: { alias: finalAlias },
					},
				);

				if (!existingPromotion) {
					isUnique = true;
					continue;
				} else {
					finalAlias = Math.random().toString(36).substring(2, 16);
				}

				attempts++;
			}
		}

		const promotion = await this.prismaService.promotion.create({
			data: {
				alias: finalAlias,
				coinsReward,
				expiresAt,
				maxUses,
				productIdReward,
				usedCount: 0,
			},
		});

		return plainToInstance(PromotionDto, promotion);
	}

	public async getAllActivePromotions(): Promise<PromotionDto[]> {
		const promotions = await this.prismaService.promotion.findMany({
			where: {
				OR: [{ expiresAt: { gt: new Date() } }, { expiresAt: null }],
			},
			orderBy: { createdAt: 'desc' },
		});

		return plainToInstance(PromotionDto, promotions);
	}

	public async getPromotionByAlias(alias: string): Promise<PromotionDto> {
		const promotion = await this.prismaService.promotion.findFirst({
			where: { alias },
		});

		if (!promotion)
			throw new NotFoundException(ERROR_MESSAGES.PROMOTION.NOT_FOUND);

		return plainToInstance(PromotionDto, promotion);
	}

	public async updatePromotion(
		id: string,
		dto: UpdatePromotionDto,
	): Promise<PromotionDto> {
		const { coinsReward, expiresAt, maxUses, productIdReward } = dto;

		const promotion = await this.getPromotionById(id);

		const updatedPromotion = await this.prismaService.promotion.update({
			where: { id },
			data: {
				coinsReward: coinsReward || promotion.coinsReward,
				expiresAt: expiresAt || promotion.expiresAt,
				maxUses: maxUses || promotion.maxUses,
				product: { connect: { id: productIdReward } },
			},
		});

		return plainToInstance(PromotionDto, updatedPromotion);
	}

	public async getPromotionById(id: string): Promise<PromotionDto> {
		const promotion = await this.prismaService.promotion.findUnique({
			where: { id },
		});

		if (!promotion)
			throw new NotFoundException(ERROR_MESSAGES.PROMOTION.NOT_FOUND);

		return plainToInstance(PromotionDto, promotion);
	}

	public async deletePromotion(id: string): Promise<MessageResponse> {
		const promotion = await this.getPromotionById(id);

		await this.prismaService.promotion.delete({
			where: { id: promotion.id },
		});

		return SUCCESS_MESSAGES.PROMOTION.DELETED;
	}
}
