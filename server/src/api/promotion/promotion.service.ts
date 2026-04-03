import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { ProductService } from '../product/product.service';
import { CreatePromotionDto, UpdatePromotionDto } from './dto';

@Injectable()
export class PromotionService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly productService: ProductService,
	) {}

	async createPromotion(dto: CreatePromotionDto) {
		const { alias, coinsReward, expiresAt, maxUses, productIdReward } = dto;

		if (!coinsReward && !productIdReward) {
			throw new BadRequestException(
				'Either coinsReward or productIdReward must be provided',
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
				throw new ConflictException('Promotion with this alias already exists');
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

		console.log(finalAlias, alias);

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

		return promotion;
	}

	async getAllActivePromotions() {
		const promotions = await this.prismaService.promotion.findMany({
			where: {
				OR: [{ expiresAt: { gt: new Date() } }, { expiresAt: null }],
			},
			orderBy: { createdAt: 'desc' },
		});

		return promotions;
	}

	async getPromotionByAlias(alias: string) {
		const promotion = await this.prismaService.promotion.findFirst({
			where: { alias },
		});

		if (!promotion) throw new NotFoundException('Promotion not found');

		return promotion;
	}

	async updatePromotion(id: string, dto: UpdatePromotionDto) {
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

		return updatedPromotion;
	}

	async getPromotionById(id: string) {
		const promotion = await this.prismaService.promotion.findUnique({
			where: { id },
		});

		if (!promotion) throw new NotFoundException('Promotion not found');

		return promotion;
	}

	async deletePromotion(id: string) {
		const promotion = await this.getPromotionById(id);

		await this.prismaService.promotion.delete({
			where: { id: promotion.id },
		});

		return { code: 'PROMOTION_DELETED' };
	}
}
