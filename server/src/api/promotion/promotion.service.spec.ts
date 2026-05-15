import { Product, Promotion } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import {
	BadRequestException,
	ConflictException,
	NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product/product.service';
import { PromotionService } from './promotion.service';

type PrismaMock = {
	promotion: {
		create: jest.Mock;
		findMany: jest.Mock;
		findUnique: jest.Mock;
		findFirst: jest.Mock;
		update: jest.Mock;
		delete: jest.Mock;
	};
};

type ProductServiceMock = {
	getProductById: jest.Mock;
};

describe('PromotionService', () => {
	let service: PromotionService;
	let prisma: PrismaMock;
	let productService: ProductServiceMock;

	const mockPromotion: Promotion = {
		id: 'promo_1',
		alias: 'TEST_ALIAS',
		coinsReward: 100,
		productIdReward: null,
		expiresAt: new Date('2030-01-01'),
		maxUses: 10,
		usedCount: 0,
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	const mockProduct: Product = {
		id: 'prod_1',
		type: 'ITEM',
		itemType: null,
		bundleId: null,
		itemId: 'item_123',
		isNew: true,
		isPopular: true,
		isExclusive: false,
		isShowInStore: true,
		isLimited: false,
		price: 1000,
		discountedPrice: 800,
		maxStock: 50,
		soldCount: 5,
		expiresAt: new Date('2030-01-01'),
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	beforeEach(async () => {
		prisma = {
			promotion: {
				create: jest.fn(),
				findMany: jest.fn(),
				findUnique: jest.fn(),
				findFirst: jest.fn(),
				update: jest.fn(),
				delete: jest.fn(),
			},
		};

		productService = {
			getProductById: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				PromotionService,
				{ provide: PrismaService, useValue: prisma },
				{ provide: ProductService, useValue: productService },
			],
		}).compile();

		service = module.get<PromotionService>(PromotionService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('createPromotion', () => {
		it('should throw BadRequestException if neither coinsReward nor productIdReward is provided', async () => {
			const dto = {
				alias: 'TEST',
				expiresAt: new Date(),
				maxUses: 5,
			};

			await expect(service.createPromotion(dto)).rejects.toThrow(
				BadRequestException,
			);
		});

		it('should throw ConflictException if provided alias already exists', async () => {
			prisma.promotion.findUnique.mockResolvedValue(mockPromotion);

			const dto = {
				alias: 'TEST_ALIAS',
				coinsReward: 100,
			};

			await expect(service.createPromotion(dto)).rejects.toThrow(
				ConflictException,
			);
		});

		it('should create a promotion with a provided alias and productIdReward', async () => {
			productService.getProductById.mockResolvedValue(mockProduct);
			prisma.promotion.findUnique.mockResolvedValue(null);
			prisma.promotion.create.mockResolvedValue(mockPromotion);

			const dto = {
				alias: 'CUSTOM_ALIAS',
				productIdReward: 'prod_1',
				expiresAt: new Date('2030-01-01'),
				maxUses: 5,
			};

			const result = await service.createPromotion(dto);

			expect(productService.getProductById).toHaveBeenCalledWith('prod_1');
			expect(prisma.promotion.create).toHaveBeenCalledWith({
				data: {
					alias: 'CUSTOM_ALIAS',
					coinsReward: undefined,
					expiresAt: dto.expiresAt,
					maxUses: 5,
					productIdReward: 'prod_1',
					usedCount: 0,
				},
			});
			expect(result).toEqual(mockPromotion);
		});

		it('should create a promotion with a generated alias if alias is not provided', async () => {
			prisma.promotion.findUnique.mockResolvedValue(null);
			prisma.promotion.create.mockResolvedValue(mockPromotion);

			const dto = {
				coinsReward: 150,
				expiresAt: new Date('2030-01-01'),
				maxUses: 10,
			};

			const result = await service.createPromotion(dto);

			expect(prisma.promotion.findUnique).toHaveBeenCalled();
			expect(prisma.promotion.create).toHaveBeenCalledWith({
				data: {
					alias: expect.any(String),
					coinsReward: 150,
					expiresAt: dto.expiresAt,
					maxUses: 10,
					productIdReward: undefined,
					usedCount: 0,
				},
			});
			expect(result).toEqual(mockPromotion);
		});
	});

	describe('getAllActivePromotions', () => {
		it('should return a list of active promotions', async () => {
			prisma.promotion.findMany.mockResolvedValue([mockPromotion]);

			const result = await service.getAllActivePromotions();

			expect(prisma.promotion.findMany).toHaveBeenCalledWith({
				where: {
					OR: [{ expiresAt: { gt: expect.any(Date) } }, { expiresAt: null }],
				},
				orderBy: { createdAt: 'desc' },
			});
			expect(result).toEqual([mockPromotion]);
		});
	});

	describe('getPromotionByAlias', () => {
		it('should return a promotion by alias', async () => {
			prisma.promotion.findFirst.mockResolvedValue(mockPromotion);

			const result = await service.getPromotionByAlias('TEST_ALIAS');

			expect(prisma.promotion.findFirst).toHaveBeenCalledWith({
				where: { alias: 'TEST_ALIAS' },
			});
			expect(result).toEqual(mockPromotion);
		});

		it('should throw NotFoundException if promotion is not found by alias', async () => {
			prisma.promotion.findFirst.mockResolvedValue(null);

			await expect(
				service.getPromotionByAlias('UNKNOWN_ALIAS'),
			).rejects.toThrow(NotFoundException);
		});
	});

	describe('getPromotionById', () => {
		it('should return a promotion by id', async () => {
			prisma.promotion.findUnique.mockResolvedValue(mockPromotion);

			const result = await service.getPromotionById('promo_1');

			expect(prisma.promotion.findUnique).toHaveBeenCalledWith({
				where: { id: 'promo_1' },
			});
			expect(result).toEqual(mockPromotion);
		});

		it('should throw NotFoundException if promotion is not found by id', async () => {
			prisma.promotion.findUnique.mockResolvedValue(null);

			await expect(service.getPromotionById('unknown_id')).rejects.toThrow(
				NotFoundException,
			);
		});
	});

	describe('updatePromotion', () => {
		it('should update a promotion successfully', async () => {
			prisma.promotion.findUnique.mockResolvedValue(mockPromotion);
			prisma.promotion.update.mockResolvedValue({
				...mockPromotion,
				coinsReward: 200,
			});

			const dto = {
				coinsReward: 200,
			};

			const result = await service.updatePromotion('promo_1', dto);

			expect(prisma.promotion.findUnique).toHaveBeenCalledWith({
				where: { id: 'promo_1' },
			});
			expect(prisma.promotion.update).toHaveBeenCalledWith({
				where: { id: 'promo_1' },
				data: {
					coinsReward: 200,
					expiresAt: mockPromotion.expiresAt,
					maxUses: mockPromotion.maxUses,
					product: { connect: { id: undefined } },
				},
			});
			expect(result.coinsReward).toEqual(200);
		});
	});

	describe('deletePromotion', () => {
		it('should delete a promotion successfully', async () => {
			prisma.promotion.findUnique.mockResolvedValue(mockPromotion);
			prisma.promotion.delete.mockResolvedValue(mockPromotion);

			const result = await service.deletePromotion('promo_1');

			expect(prisma.promotion.findUnique).toHaveBeenCalledWith({
				where: { id: 'promo_1' },
			});
			expect(prisma.promotion.delete).toHaveBeenCalledWith({
				where: { id: 'promo_1' },
			});
			expect(result).toEqual({ code: 'PROMOTION_DELETED' });
		});
	});
});
