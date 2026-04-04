import {
	BadRequestException,
	ConflictException,
	NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AcquiredFrom, Item } from 'generated/prisma/client';
import { CoinTransactionService } from 'src/api/coin-transaction/coin-transaction.service';
import { ProductService } from 'src/api/product/product.service';
import { PurchaseHistoryService } from 'src/api/purchase-history/purchase-history.service';
import { ShopService } from 'src/api/shop/shop.service';
import { UserInventoryService } from 'src/api/user-inventory/user-inventory.service';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { PromotionUsageService } from './promotion-usage.service';

type PrismaTxMock = {
	promotion: {
		findUnique: jest.Mock;
		update: jest.Mock;
	};
	promotionUsage: {
		create: jest.Mock;
	};
};

type PrismaMock = {
	$transaction: jest.Mock;
};

type CoinTransactionMock = {
	createTransaction: jest.Mock;
};

type ShopMock = {
	getItemsToAdd: jest.Mock;
};

type PurchaseHistoryMock = {
	createPurchaseHistory: jest.Mock;
};

type UserInventoryMock = {
	bulkAddItemsToInventory: jest.Mock;
};

type ProductMock = {
	getProductById: jest.Mock;
};

describe('PromotionUsageService', () => {
	let service: PromotionUsageService;
	let prismaTx: PrismaTxMock;
	let prismaService: PrismaMock;
	let coinTransactionService: CoinTransactionMock;
	let shopService: ShopMock;
	let purchaseHistoryService: PurchaseHistoryMock;
	let userInventoryService: UserInventoryMock;
	let productService: ProductMock;

	const mockItem = {
		id: 'item_1',
		translations: [{ name: 'Sword', language: 'en' }],
	} as unknown as Item;

	const mockProductWithItem = {
		id: 'prod_1',
		price: 1000,
		discountedPrice: 800,
		itemId: 'item_1',
		item: mockItem,
		bundleId: null,
		bundle: null,
	};

	const mockProductWithBundle = {
		id: 'prod_2',
		price: 2000,
		discountedPrice: null,
		itemId: null,
		item: null,
		bundleId: 'bundle_1',
		bundle: {
			translations: [{ name: 'Starter Pack', language: 'en' }],
			items: [{ item: mockItem }],
		},
	};

	const defaultPromotion = {
		id: 'promo_1',
		alias: 'TEST_PROMO',
		expiresAt: new Date('2050-01-01'),
		maxUses: 10,
		usedCount: 0,
		coinsReward: null,
		productIdReward: null,
		usage: [],
	};

	beforeEach(async () => {
		prismaTx = {
			promotion: {
				findUnique: jest.fn(),
				update: jest.fn(),
			},
			promotionUsage: {
				create: jest.fn(),
			},
		};

		prismaService = {
			$transaction: jest.fn().mockImplementation(async (cb) => cb(prismaTx)),
		};

		coinTransactionService = {
			createTransaction: jest.fn(),
		};

		shopService = {
			getItemsToAdd: jest.fn(),
		};

		purchaseHistoryService = {
			createPurchaseHistory: jest.fn(),
		};

		userInventoryService = {
			bulkAddItemsToInventory: jest.fn(),
		};

		productService = {
			getProductById: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				PromotionUsageService,
				{ provide: PrismaService, useValue: prismaService },
				{ provide: CoinTransactionService, useValue: coinTransactionService },
				{ provide: ShopService, useValue: shopService },
				{ provide: PurchaseHistoryService, useValue: purchaseHistoryService },
				{ provide: UserInventoryService, useValue: userInventoryService },
				{ provide: ProductService, useValue: productService },
			],
		}).compile();

		service = module.get<PromotionUsageService>(PromotionUsageService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('usePromotion', () => {
		it('should throw NotFoundException if promotion does not exist', async () => {
			prismaTx.promotion.findUnique.mockResolvedValue(null);

			await expect(service.usePromotion('INVALID', 'user_1')).rejects.toThrow(
				NotFoundException,
			);
		});

		it('should throw BadRequestException if promotion is expired', async () => {
			prismaTx.promotion.findUnique.mockResolvedValue({
				...defaultPromotion,
				expiresAt: new Date('2000-01-01'),
			});

			await expect(service.usePromotion('TEST', 'user_1')).rejects.toThrow(
				BadRequestException,
			);
		});

		it('should throw BadRequestException if promotion has reached max uses', async () => {
			prismaTx.promotion.findUnique.mockResolvedValue({
				...defaultPromotion,
				maxUses: 5,
				usedCount: 5,
			});

			await expect(service.usePromotion('TEST', 'user_1')).rejects.toThrow(
				BadRequestException,
			);
		});

		it('should throw ConflictException if user has already used the promotion', async () => {
			prismaTx.promotion.findUnique.mockResolvedValue({
				...defaultPromotion,
				usage: [{ id: 'usage_1' }],
			});

			await expect(service.usePromotion('TEST', 'user_1')).rejects.toThrow(
				ConflictException,
			);
		});

		it('should successfully apply a coins reward', async () => {
			prismaTx.promotion.findUnique.mockResolvedValue({
				...defaultPromotion,
				coinsReward: 500,
			});

			const result = await service.usePromotion('TEST', 'user_1');

			expect(prismaTx.promotionUsage.create).toHaveBeenCalledWith({
				data: {
					promotion: { connect: { id: 'promo_1' } },
					user: { connect: { id: 'user_1' } },
				},
			});

			expect(prismaTx.promotion.update).toHaveBeenCalledWith({
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
				prismaTx,
			);

			expect(result).toEqual({
				code: 'PROMOTION_SUCCESSFULLY_USED',
				message: 'Promotion used successfully',
			});
		});

		it('should successfully apply a product item reward', async () => {
			prismaTx.promotion.findUnique.mockResolvedValue({
				...defaultPromotion,
				productIdReward: 'prod_1',
			});

			productService.getProductById.mockResolvedValue(mockProductWithItem);
			shopService.getItemsToAdd.mockResolvedValue({ itemsToAdd: [mockItem] });
			coinTransactionService.createTransaction.mockResolvedValue({
				transaction: { id: 'tx_1' },
			});

			const result = await service.usePromotion('TEST', 'user_1');

			expect(productService.getProductById).toHaveBeenCalledWith('prod_1');
			expect(shopService.getItemsToAdd).toHaveBeenCalledWith(
				[mockItem],
				'user_1',
				prismaTx,
			);

			expect(coinTransactionService.createTransaction).toHaveBeenCalledWith(
				{
					userId: 'user_1',
					amount: 0,
					transactionType: 'PROMOTION',
					meta: { promotionId: 'promo_1' },
					referenceId: 'promo_1',
				},
				prismaTx,
			);

			expect(purchaseHistoryService.createPurchaseHistory).toHaveBeenCalledWith(
				{
					nameSnapshot: [{ name: 'Sword', language: 'en' }],
					pricePaid: 0,
					priceSnapshot: 800,
					productId: 'prod_1',
					transactionId: 'tx_1',
					userId: 'user_1',
				},
				prismaTx,
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
				prismaTx,
			);

			expect(result).toEqual({
				code: 'PROMOTION_SUCCESSFULLY_USED',
				message: 'Promotion used successfully',
			});
		});

		it('should successfully apply a product bundle reward', async () => {
			prismaTx.promotion.findUnique.mockResolvedValue({
				...defaultPromotion,
				productIdReward: 'prod_2',
			});

			productService.getProductById.mockResolvedValue(mockProductWithBundle);
			shopService.getItemsToAdd.mockResolvedValue({ itemsToAdd: [mockItem] });
			coinTransactionService.createTransaction.mockResolvedValue({
				transaction: { id: 'tx_2' },
			});

			await service.usePromotion('TEST', 'user_1');

			expect(shopService.getItemsToAdd).toHaveBeenCalledWith(
				[mockItem],
				'user_1',
				prismaTx,
			);

			expect(purchaseHistoryService.createPurchaseHistory).toHaveBeenCalledWith(
				{
					nameSnapshot: [{ name: 'Starter Pack', language: 'en' }],
					pricePaid: 0,
					priceSnapshot: 2000,
					productId: 'prod_2',
					transactionId: 'tx_2',
					userId: 'user_1',
				},
				prismaTx,
			);
		});
	});
});
