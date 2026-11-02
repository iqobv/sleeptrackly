import { StreakService } from '@api/streak/streak.service';
import { PrismaService } from '@infra/prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import dayjs from 'dayjs';
import { UserStatsDto } from './dto/user-stats.dto';
import { UserStatsService } from './user-stats.service';

type PrismaMock = {
	userStats: {
		findUnique: jest.Mock;
		create: jest.Mock;
		updateMany: jest.Mock;
	};
};

type StreakServiceMock = {
	validateStreakExpiration: jest.Mock;
};

describe('UserStatsService', () => {
	let service: UserStatsService;
	let prisma: PrismaMock;
	let streakService: StreakServiceMock;

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
		prisma = {
			userStats: {
				create: jest.fn(),
				findUnique: jest.fn(),
				updateMany: jest.fn(),
			},
		};

		streakService = {
			validateStreakExpiration: jest.fn(),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserStatsService,
				{ provide: PrismaService, useValue: prisma },
				{ provide: StreakService, useValue: streakService },
			],
		}).compile();

		service = module.get<UserStatsService>(UserStatsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('syncUserStats', () => {
		it('should create user stats if not exists', async () => {
			prisma.userStats.findUnique.mockResolvedValue(null);
			prisma.userStats.create.mockResolvedValue(userStats);

			const result = await service.syncUserStats('user_1', 'UTC');

			expect(prisma.userStats.findUnique).toHaveBeenCalledWith({
				where: { userId: 'user_1' },
				include: { activeStreak: true },
			});
			expect(prisma.userStats.create).toHaveBeenCalledWith({
				data: { userId: 'user_1' },
				include: { activeStreak: true },
			});
			expect(result).toMatchObject(userStats);
		});

		it('should return existing user stats if not need to update streak or challenge restores', async () => {
			prisma.userStats.findUnique.mockResolvedValue(userStats);
			streakService.validateStreakExpiration.mockResolvedValue(false);

			jest.spyOn(service, 'resetChallengeRestores').mockReturnValue(null);
			jest.spyOn(service, 'getStreakUpdates').mockReturnValue(null);

			const result = await service.syncUserStats('user_1', 'UTC');

			expect(prisma.userStats.findUnique).toHaveBeenCalledWith({
				where: { userId: 'user_1' },
				include: { activeStreak: true },
			});
			expect(streakService.validateStreakExpiration).toHaveBeenCalledWith(
				'user_1',
				'UTC',
				undefined,
			);
			expect(result).toMatchObject(userStats);
		});

		it('should update user stats if streak was updated', async () => {
			prisma.userStats.findUnique.mockResolvedValue(userStats);
			streakService.validateStreakExpiration.mockResolvedValue(true);
			prisma.userStats.updateMany.mockResolvedValue({
				count: 1,
			});

			jest.spyOn(service, 'resetChallengeRestores').mockReturnValue(null);
			jest.spyOn(service, 'getStreakUpdates').mockReturnValue({
				streakRestores: 2,
				streakRestoresResetAt: new Date(),
			});

			const result = await service.syncUserStats('user_1', 'UTC');

			const updatedStats = {
				...userStats,
				streakRestores: 2,
				streakRestoresResetAt: expect.any(Date),
			};

			expect(prisma.userStats.findUnique).toHaveBeenCalledWith({
				where: { userId: 'user_1' },
				include: { activeStreak: true },
			});
			expect(streakService.validateStreakExpiration).toHaveBeenCalledWith(
				'user_1',
				'UTC',
				undefined,
			);
			expect(prisma.userStats.updateMany).toHaveBeenCalledWith({
				where: {
					userId: 'user_1',
					streakRestoresResetAt: userStats.streakRestoresResetAt,
				},
				data: {
					streakRestores: 2,
					streakRestoresResetAt: expect.any(Date),
				},
			});
			expect(result).toMatchObject(updatedStats);
		});
	});

	it('should fallback to findUnique if updateMany returns count 0', async () => {
		const updatedUserStats = { ...userStats, streakRestores: 2 };

		prisma.userStats.findUnique
			.mockResolvedValueOnce(userStats)
			.mockResolvedValueOnce(updatedUserStats);

		streakService.validateStreakExpiration.mockResolvedValue(false);
		prisma.userStats.updateMany.mockResolvedValue({ count: 0 });

		jest.spyOn(service, 'resetChallengeRestores').mockReturnValue(null);
		jest.spyOn(service, 'getStreakUpdates').mockReturnValue({
			streakRestores: 2,
			streakRestoresResetAt: new Date(),
		});

		const result = await service.syncUserStats('user_1', 'UTC');

		expect(prisma.userStats.updateMany).toHaveBeenCalled();
		expect(prisma.userStats.findUnique).toHaveBeenCalledTimes(2);
		expect(result).toMatchObject(updatedUserStats);
	});

	describe('resetChallengeRestores', () => {
		it('should return null if now is before resetAt', () => {
			const stats: UserStatsDto = {
				...userStats,
				challengeRestoresResetAt: dayjs().add(1, 'day').toDate(),
			};

			const result = service.resetChallengeRestores(stats, new Date());
			expect(result).toBeNull();
		});

		it('should return 3 restores if missed an entire week', () => {
			const stats: UserStatsDto = {
				...userStats,
				challengeRestoresResetAt: dayjs().subtract(7, 'day').toDate(),
			};

			const result = service.resetChallengeRestores(stats, new Date());
			expect(result).toEqual({
				challengeRestores: 3,
				challengeRestoresResetAt: expect.any(Date),
			});
		});

		it('should return 3 restores if challengeRestores >= 2', () => {
			const stats: UserStatsDto = {
				...userStats,
				challengeRestores: 2,
				challengeRestoresResetAt: dayjs().subtract(1, 'day').toDate(),
			};

			const result = service.resetChallengeRestores(stats, new Date());
			expect(result).toEqual({
				challengeRestores: 3,
				challengeRestoresResetAt: expect.any(Date),
			});
		});

		it('should return 2 restores if challengeRestores < 2', () => {
			const stats: UserStatsDto = {
				...userStats,
				challengeRestores: 1,
				challengeRestoresResetAt: dayjs().subtract(1, 'day').toDate(),
			};

			const result = service.resetChallengeRestores(stats, new Date());
			expect(result).toEqual({
				challengeRestores: 2,
				challengeRestoresResetAt: expect.any(Date),
			});
		});
	});

	describe('getStreakUpdates', () => {
		it('should return null if now is before resetAt', () => {
			const stats: UserStatsDto = {
				...userStats,
				streakRestoresResetAt: dayjs().add(1, 'day').toDate(),
			};

			const result = service.getStreakUpdates(stats, new Date());
			expect(result).toBeNull();
		});

		it('should return streak updates if now is after resetAt', () => {
			const stats: UserStatsDto = {
				...userStats,
				streakRestoresResetAt: dayjs().subtract(1, 'day').toDate(),
			};

			const result = service.getStreakUpdates(stats, new Date());
			expect(result).toEqual({
				streakRestores: 2,
				streakRestoresResetAt: expect.any(Date),
			});
		});
	});
});
