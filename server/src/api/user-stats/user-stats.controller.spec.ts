import { Test, TestingModule } from '@nestjs/testing';
import { UserStatsDto } from './dto/user-stats.dto';
import { UserStatsController } from './user-stats.controller';
import { UserStatsService } from './user-stats.service';

type UserStatsServiceMock = {
	getUserStats: jest.Mock;
};

describe('UserStatsController', () => {
	let controller: UserStatsController;
	let service: UserStatsServiceMock;

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
		service = {
			getUserStats: jest.fn(),
		};

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
