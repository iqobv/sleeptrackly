import { CoinTransactionService } from '@api/coin-transaction/coin-transaction.service';
import { PurchaseHistoryService } from '@api/purchase-history/purchase-history.service';
import { ShopService } from '@api/shop/shop.service';
import { UserInventoryService } from '@api/user-inventory/user-inventory.service';
import { AcquiredFrom, Item, Prisma } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';
import { prismaMock } from '@libs/prisma/prisma.mock';
import { partialMock } from '@libs/utils/mock-helper.util';
import {
	BadRequestException,
	ConflictException,
	NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mock, mockReset } from 'jest-mock-extended';
import { PromotionUsageService } from './promotion-usage.service';

type PromotionWithRelations = Prisma.PromotionGetPayload<{
	include: {
		usage: true;
		product: {
			include: {
				item: { include: { translations: true } };
				bundle: {
					include: {
						translations: true;
						items: { include: { item: true } };
					};
				};
			};
		};
	};
}>;

type CreateTxResult = Awaited<
	ReturnType<CoinTransactionService['createTransaction']>
>;

describe('PromotionUsageService', () => {
	let service: PromotionUsageService;
	const coinTransactionService = mock<CoinTransactionService>();
	const shopService = mock<ShopService>();
	const purchaseHistoryService = mock<PurchaseHistoryService>();
	const userInventoryService = mock<UserInventoryService>();

	const mockItem = partialMock<Item>({
		id: 'item_1',
	});

	const defaultPromotion = partialMock<PromotionWithRelations>({
		id: 'promo_1',
		alias: 'TEST_PROMO',
		expiresAt: new Date('2050-01-01'),
		maxUses: 10,
		usedCount: 0,
		coinsReward: null,
		productIdReward: null,
		usage: [],
	});

	beforeEach(async () => {
		mockReset(prismaMock);
		mockReset(coinTransactionService);
		mockReset(shopService);
		mockReset(purchaseHistoryService);
		mockReset(userInventoryService);

		prismaMock.$transaction.mockImplementation(async (cb) => cb(prismaMock));

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				PromotionUsageService,
				{ provide: PrismaService, useValue: prismaMock },
				{ provide: CoinTransactionService, useValue: coinTransactionService },
				{ provide: ShopService, useValue: shopService },
				{ provide: PurchaseHistoryService, useValue: purchaseHistoryService },
				{ provide: UserInventoryService, useValue: userInventoryService },
			],
		}).compile();

		service = module.get<PromotionUsageService>(PromotionUsageService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('usePromotion', () => {
		it('should throw NotFoundException if promotion does not exist', async () => {
			prismaMock.promotion.findUnique.mockResolvedValue(null);

			await expect(service.usePromotion('INVALID', 'user_1')).rejects.toThrow(
				NotFoundException,
			);
		});

		it('should throw BadRequestException if promotion is expired', async () => {
			prismaMock.promotion.findUnique.mockResolvedValue(
				partialMock<PromotionWithRelations>({
					...defaultPromotion,
					expiresAt: new Date('2000-01-01'),
				}),
			);

			await expect(service.usePromotion('TEST', 'user_1')).rejects.toThrow(
				BadRequestException,
			);
		});

		it('should throw BadRequestException if promotion has reached max uses', async () => {
			prismaMock.promotion.findUnique.mockResolvedValue(
				partialMock<PromotionWithRelations>({
					...defaultPromotion,
					maxUses: 5,
					usedCount: 5,
				}),
			);

			await expect(service.usePromotion('TEST', 'user_1')).rejects.toThrow(
				BadRequestException,
			);
		});

		it('should throw ConflictException if user has already used the promotion', async () => {
			prismaMock.promotion.findUnique.mockResolvedValue(
				partialMock<PromotionWithRelations>({
					...defaultPromotion,
					usage: [
						{
							id: 'usage_1',
							userId: 'user_1',
							promotionId: 'promo_1',
							createdAt: new Date(),
						},
					],
				}),
			);

			await expect(service.usePromotion('TEST', 'user_1')).rejects.toThrow(
				ConflictException,
			);
		});

		it('should successfully apply a coins reward', async () => {
			prismaMock.promotion.findUnique.mockResolvedValue(
				partialMock<PromotionWithRelations>({
					...defaultPromotion,
					coinsReward: 500,
				}),
			);

			const result = await service.usePromotion('TEST', 'user_1');

			expect(prismaMock.promotionUsage.create).toHaveBeenCalledWith({
				data: {
					promotion: { connect: { id: 'promo_1' } },
					user: { connect: { id: 'user_1' } },
				},
			});

			expect(prismaMock.promotion.update).toHaveBeenCalledWith({
				where: { id: 'promo_1' },
				data: { usedCount: { increment: 1 } },
			});

			expect(coinTransactionService.createTransaction).toHaveBeenCalledWith(
				{
					userId: 'user_1',
					amount: 500,
					transactionType: 'PROMOTION',
					meta: { promotionId: 'promo_1' },
					referenceId: 'promo_1',
				},
				prismaMock,
			);

			expect(result).toEqual(SUCCESS_MESSAGES.PROMOTION.USED);
		});

		it('should successfully apply a product item reward', async () => {
			const expectedItem = partialMock({ ...mockItem, translations: [] });

			prismaMock.promotion.findUnique.mockResolvedValue(
				partialMock<PromotionWithRelations>({
					...defaultPromotion,
					productIdReward: 'prod_1',
					product: partialMock<PromotionWithRelations['product']>({
						id: 'prod_1',
						discountedPrice: 800,
						price: 1000,
						itemId: 'item_1',
						item: expectedItem,
					}),
				}),
			);

			shopService.getItemsToAdd.mockResolvedValue({
				itemsToAdd: [mockItem],
				alreadyOwnedItems: [],
			});

			coinTransactionService.createTransaction.mockResolvedValue(
				partialMock<CreateTxResult>({
					transaction: partialMock<CreateTxResult['transaction']>({
						id: 'tx_1',
					}),
				}),
			);

			const result = await service.usePromotion('TEST', 'user_1');

			expect(shopService.getItemsToAdd).toHaveBeenCalledWith(
				[expectedItem],
				'user_1',
				prismaMock,
			);

			expect(coinTransactionService.createTransaction).toHaveBeenCalledWith(
				{
					userId: 'user_1',
					amount: 0,
					transactionType: 'PROMOTION',
					meta: { promotionId: 'promo_1' },
					referenceId: 'promo_1',
				},
				prismaMock,
			);

			expect(purchaseHistoryService.createPurchaseHistory).toHaveBeenCalledWith(
				{
					nameSnapshot: [],
					pricePaid: 0,
					priceSnapshot: 800,
					productId: 'prod_1',
					transactionId: 'tx_1',
					userId: 'user_1',
				},
				prismaMock,
			);

			expect(userInventoryService.bulkAddItemsToInventory).toHaveBeenCalledWith(
				[
					{
						userId: 'user_1',
						itemId: 'item_1',
						acquiredAt: expect.any(Date),
						acquiredFrom: AcquiredFrom.PROMOTION,
						isEquipped: false,
					},
				],
				prismaMock,
			);

			expect(result).toEqual(SUCCESS_MESSAGES.PROMOTION.USED);
		});

		it('should successfully apply a product bundle reward', async () => {
			type ProductPayload = NonNullable<PromotionWithRelations['product']>;
			type BundlePayload = NonNullable<ProductPayload['bundle']>;
			type BundleTranslation = BundlePayload['translations'][number];
			type BundleItemPayload = BundlePayload['items'][number];

			const expectedItem = partialMock({ ...mockItem, translations: [] });

			prismaMock.promotion.findUnique.mockResolvedValue(
				partialMock<PromotionWithRelations>({
					...defaultPromotion,
					productIdReward: 'prod_2',
					product: partialMock<ProductPayload>({
						id: 'prod_2',
						price: 2000,
						discountedPrice: null,
						bundleId: 'bundle_1',
						bundle: partialMock<BundlePayload>({
							translations: [
								partialMock<BundleTranslation>({
									name: 'Test Bundle',
									language: 'en',
								}),
							],
							items: [
								partialMock<BundleItemPayload>({
									item: expectedItem,
								}),
							],
						}),
					}),
				}),
			);

			shopService.getItemsToAdd.mockResolvedValue({
				itemsToAdd: [mockItem],
				alreadyOwnedItems: [],
			});

			coinTransactionService.createTransaction.mockResolvedValue(
				partialMock<CreateTxResult>({
					transaction: partialMock<CreateTxResult['transaction']>({
						id: 'tx_2',
					}),
				}),
			);

			await service.usePromotion('TEST', 'user_1');

			expect(shopService.getItemsToAdd).toHaveBeenCalledWith(
				[expectedItem],
				'user_1',
				prismaMock,
			);

			expect(purchaseHistoryService.createPurchaseHistory).toHaveBeenCalledWith(
				{
					nameSnapshot: [{ name: 'Test Bundle', language: 'en' }],
					pricePaid: 0,
					priceSnapshot: 2000,
					productId: 'prod_2',
					transactionId: 'tx_2',
					userId: 'user_1',
				},
				prismaMock,
			);
		});
	});
});
