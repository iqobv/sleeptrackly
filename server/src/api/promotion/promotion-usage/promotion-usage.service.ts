import { CoinTransactionService } from '@api/coin-transaction/coin-transaction.service';
import { ProductService } from '@api/product/product.service';
import { PurchaseHistoryService } from '@api/purchase-history/purchase-history.service';
import { ShopService } from '@api/shop/shop.service';
import { UserInventoryService } from '@api/user-inventory/user-inventory.service';
import { AcquiredFrom, Item } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { MessageResponse } from '@libs/types';
import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';

@Injectable()
export class PromotionUsageService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly coinTransactionService: CoinTransactionService,
		private readonly shopService: ShopService,
		private readonly purchaseHistoryService: PurchaseHistoryService,
		private readonly userInventoryService: UserInventoryService,
		private readonly productService: ProductService,
	) {}

	public async usePromotion(
		alias: string,
		userId: string,
	): Promise<MessageResponse> {
		return await this.prismaService.$transaction(async (tx) => {
			const promotion = await tx.promotion.findUnique({
				where: { alias },
				include: { usage: { where: { userId } } },
			});

			if (!promotion)
				throw new NotFoundException(ERROR_MESSAGES.PROMOTION.NOT_FOUND);

			if (promotion.expiresAt && promotion.expiresAt < new Date())
				throw new BadRequestException(ERROR_MESSAGES.PROMOTION.HAS_EXPIRED);

			if (promotion.maxUses && promotion.usedCount >= promotion.maxUses)
				throw new BadRequestException(
					ERROR_MESSAGES.PROMOTION.HAS_REACHED_ITS_USAGE_LIMIT,
				);

			if (promotion.usage.length > 0)
				throw new ConflictException(
					ERROR_MESSAGES.PROMOTION.ALREADY_USED_THIS_PROMOTION,
				);

			await tx.promotionUsage.create({
				data: {
					promotion: { connect: { id: promotion.id } },
					user: { connect: { id: userId } },
				},
			});

			await tx.promotion.update({
				where: { id: promotion.id },
				data: { usedCount: { increment: 1 } },
			});

			if (promotion.coinsReward) {
				await this.coinTransactionService.createTransaction(
					{
						userId,
						amount: promotion.coinsReward,
						transactionType: 'PROMOTION',
						meta: { promotionId: promotion.id },
						referenceId: promotion.id,
					},
					tx,
				);
			}

			if (promotion.productIdReward) {
				const product = await this.productService.getProductById(
					promotion.productIdReward,
				);

				let items: Item[] = [];
				const initialPrice = product.discountedPrice ?? product.price;

				if (product.itemId && product.item) {
					items = [product.item];
				} else if (product.bundleId && product.bundle) {
					items = product.bundle.items.map((itemInBundle) => itemInBundle.item);
				}

				const { itemsToAdd } = await this.shopService.getItemsToAdd(
					items,
					userId,
					tx,
				);

				const transaction = await this.coinTransactionService.createTransaction(
					{
						userId,
						amount: 0,
						transactionType: 'PROMOTION',
						meta: { promotionId: promotion.id },
						referenceId: promotion.id,
					},
					tx,
				);

				const nameSnapshot = (
					product.item?.translations ??
					product.bundle?.translations ??
					[]
				).map((translation: { name: string; language: string }) => ({
					name: translation.name,
					language: translation.language,
				}));

				await this.purchaseHistoryService.createPurchaseHistory(
					{
						nameSnapshot,
						pricePaid: 0,
						priceSnapshot: initialPrice,
						productId: product.id,
						transactionId: transaction.transaction.id,
						userId: userId,
					},
					tx,
				);

				await this.userInventoryService.bulkAddItemsToInventory(
					itemsToAdd.map((item) => ({
						userId,
						itemId: item.id,
						acquiredAt: new Date(),
						acquiredFrom: AcquiredFrom.PROMOTION,
						isEquipped: false,
					})),
					tx,
				);
			}

			return SUCCESS_MESSAGES.PROMOTION.USED;
		});
	}
}
