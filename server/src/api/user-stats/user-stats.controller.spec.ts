import { Test, TestingModule } from '@nestjs/testing';
import { mock, mockReset } from 'jest-mock-extended';
import { UserStatsDto } from './dto/user-stats.dto';
import { UserStatsController } from './user-stats.controller';
import { UserStatsService } from './user-stats.service';

describe('UserStatsController', () => {
	let controller: UserStatsController;
	let service = mock<UserStatsService>();

	const userStats: UserStatsDto = {
		activeStreak: null,
		challengeRestores: 0,
		challengeRestoresResetAt: new Date(),
		currentStreakId: null,
		streakRestores: 0,
		streakRestoresResetAt: new Date(),
		userId: 'user_1',
		updatedAt: new Date(),
	};

	beforeEach(async () => {
		mockReset(service);

		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserStatsController],
			providers: [{ provide: UserStatsService, useValue: service }],
		}).compile();

		controller = module.get<UserStatsController>(UserStatsController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('getUserStats', () => {
		it('should return user stats', async () => {
			service.getUserStats.mockResolvedValue(userStats);

			const result = await controller.getUserStats('user_1');

			expect(service.getUserStats).toHaveBeenCalledWith('user_1');
			expect(result).toEqual(userStats);
		});
	});
});
