import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PromotionUsageController } from './promotion-usage.controller';
import { PromotionUsageService } from './promotion-usage.service';

type PromotionUsageServiceMock = {
	usePromotion: jest.Mock;
};

type ConfigServiceMock = {
	get: jest.Mock;
};

describe('PromotionUsageController', () => {
	let controller: PromotionUsageController;
	let promotionUsageService: PromotionUsageServiceMock;
	let configService: ConfigServiceMock;

	beforeEach(async () => {
		promotionUsageService = {
			usePromotion: jest.fn(),
		};

		configService = {
			get: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			controllers: [PromotionUsageController],
			providers: [
				{
					provide: PromotionUsageService,
					useValue: promotionUsageService,
				},
				{
					provide: ConfigService,
					useValue: configService,
				},
			],
		}).compile();

		controller = module.get<PromotionUsageController>(PromotionUsageController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('usePromotion', () => {
		it('should call usePromotion on the service and return the result', async () => {
			const mockResult = {
				code: 'PROMOTION_SUCCESSFULLY_USED',
				message: 'Promotion used successfully',
			};

			promotionUsageService.usePromotion.mockResolvedValue(mockResult);

			const alias = 'TEST_PROMO';
			const userId = 'user_1';

			const result = await controller.usePromotion(alias, userId);

			expect(promotionUsageService.usePromotion).toHaveBeenCalledWith(
				alias,
				userId,
			);
			expect(result).toEqual(mockResult);
		});
	});
});
