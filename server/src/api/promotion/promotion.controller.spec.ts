import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CreatePromotionDto, UpdatePromotionDto } from './dto';
import { PromotionController } from './promotion.controller';
import { PromotionService } from './promotion.service';

type PromotionServiceMock = {
	createPromotion: jest.Mock;
	getAllActivePromotions: jest.Mock;
	getPromotionByAlias: jest.Mock;
	getPromotionById: jest.Mock;
	updatePromotion: jest.Mock;
	deletePromotion: jest.Mock;
};

type ConfigServiceMock = {
	get: jest.Mock;
};

describe('PromotionController', () => {
	let controller: PromotionController;
	let promotionService: PromotionServiceMock;
	let configService: ConfigServiceMock;

	const mockPromotion = {
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

	beforeEach(async () => {
		promotionService = {
			createPromotion: jest.fn(),
			getAllActivePromotions: jest.fn(),
			getPromotionByAlias: jest.fn(),
			getPromotionById: jest.fn(),
			updatePromotion: jest.fn(),
			deletePromotion: jest.fn(),
		};

		configService = {
			get: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			controllers: [PromotionController],
			providers: [
				{
					provide: PromotionService,
					useValue: promotionService,
				},
				{
					provide: ConfigService,
					useValue: configService,
				},
			],
		}).compile();

		controller = module.get<PromotionController>(PromotionController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('createPromotion', () => {
		it('should call createPromotion on the service and return the result', async () => {
			promotionService.createPromotion.mockResolvedValue(mockPromotion);

			const dto: CreatePromotionDto = {
				alias: 'TEST_ALIAS',
				coinsReward: 100,
				expiresAt: new Date('2030-01-01'),
				maxUses: 10,
			};

			const result = await controller.createPromotion(dto);

			expect(promotionService.createPromotion).toHaveBeenCalledWith(dto);
			expect(result).toEqual(mockPromotion);
		});
	});

	describe('getAllActivePromotions', () => {
		it('should call getAllActivePromotions on the service and return the result', async () => {
			promotionService.getAllActivePromotions.mockResolvedValue([
				mockPromotion,
			]);

			const result = await controller.getAllActivePromotions();

			expect(promotionService.getAllActivePromotions).toHaveBeenCalled();
			expect(result).toEqual([mockPromotion]);
		});
	});

	describe('getPromotionByAlias', () => {
		it('should call getPromotionByAlias on the service and return the result', async () => {
			promotionService.getPromotionByAlias.mockResolvedValue(mockPromotion);

			const result = await controller.getPromotionByAlias('TEST_ALIAS');

			expect(promotionService.getPromotionByAlias).toHaveBeenCalledWith(
				'TEST_ALIAS',
			);
			expect(result).toEqual(mockPromotion);
		});
	});

	describe('getPromotionById', () => {
		it('should call getPromotionById on the service and return the result', async () => {
			promotionService.getPromotionById.mockResolvedValue(mockPromotion);

			const result = await controller.getPromotionById('promo_1');

			expect(promotionService.getPromotionById).toHaveBeenCalledWith('promo_1');
			expect(result).toEqual(mockPromotion);
		});
	});

	describe('updatePromotion', () => {
		it('should call updatePromotion on the service and return the result', async () => {
			promotionService.updatePromotion.mockResolvedValue(mockPromotion);

			const dto: UpdatePromotionDto = {
				coinsReward: 200,
			};

			const result = await controller.updatePromotion('promo_1', dto);

			expect(promotionService.updatePromotion).toHaveBeenCalledWith(
				'promo_1',
				dto,
			);
			expect(result).toEqual(mockPromotion);
		});
	});

	describe('deletePromotion', () => {
		it('should call deletePromotion on the service and return the result', async () => {
			const deleteResponse = { code: 'PROMOTION_DELETED' };
			promotionService.deletePromotion.mockResolvedValue(deleteResponse);

			const result = await controller.deletePromotion('promo_1');

			expect(promotionService.deletePromotion).toHaveBeenCalledWith('promo_1');
			expect(result).toEqual(deleteResponse);
		});
	});
});
