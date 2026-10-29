import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { StreakController } from './streak.controller';
import { StreakService } from './streak.service';

type StreakServiceMock = {
	restoreStreak: jest.Mock;
};

describe('StreakController', () => {
	let controller: StreakController;
	let service: StreakServiceMock;

	const mockUserId = 'user_1';

	beforeEach(async () => {
		service = {
			restoreStreak: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			controllers: [StreakController],
			providers: [{ provide: StreakService, useValue: service }],
		}).compile();

		controller = module.get<StreakController>(StreakController);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('restoreStreak', () => {
		it('should restore the streak successfully', async () => {
			service.restoreStreak.mockResolvedValue(
				SUCCESS_MESSAGES.STREAK.STREAK_RESTORED,
			);

			const result = await controller.restoreStreak(mockUserId);

			expect(service.restoreStreak).toHaveBeenCalledWith(mockUserId);
			expect(service.restoreStreak).toHaveBeenCalledTimes(1);

			expect(result).toEqual(SUCCESS_MESSAGES.STREAK.STREAK_RESTORED);
		});

		it('should throw an exception if the service throws an exception', async () => {
			const mockException = new BadRequestException(
				ERROR_MESSAGES.STREAK.NOT_ENOUGH_RESTORES,
			);
			service.restoreStreak.mockRejectedValue(mockException);

			await expect(controller.restoreStreak(mockUserId)).rejects.toThrow(
				mockException,
			);

			expect(service.restoreStreak).toHaveBeenCalledWith(mockUserId);
		});
	});
});
