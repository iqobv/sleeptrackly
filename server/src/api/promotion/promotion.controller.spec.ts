import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';
import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { PromotionDto } from './dto/promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { PromotionController } from './promotion.controller';
import { PromotionService } from './promotion.service';

describe('PromotionController', () => {
	let controller: PromotionController;
	let promotionService = mock<PromotionService>();

	const mockPromotion: PromotionDto = {
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
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PromotionController],
			providers: [
				{
					provide: PromotionService,
					useValue: promotionService,
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
			promotionService.deletePromotion.mockResolvedValue(
				SUCCESS_MESSAGES.PROMOTION.DELETED,
			);

			const result = await controller.deletePromotion('promo_1');

			expect(promotionService.deletePromotion).toHaveBeenCalledWith('promo_1');
			expect(result).toEqual(SUCCESS_MESSAGES.PROMOTION.DELETED);
		});
	});
});
