import { StreakService } from '@api/streak/streak.service';
import { Prisma } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { prismaMock } from '@libs/prisma/prisma.mock';
import { userSelect } from '@libs/prisma/user.select.prisma';
import { appDayjs } from '@libs/utils/dayjs.util';
import { partialMock } from '@libs/utils/mock-helper.util';
import { Test, TestingModule } from '@nestjs/testing';
import { mock, mockReset } from 'jest-mock-extended';
import { UserStatsDto } from './dto/user-stats.dto';
import { UserStatsService } from './user-stats.service';

type UserStatsWithRelations = Prisma.UserStatsGetPayload<
	typeof userSelect.userStats
> & { userId: string };

describe('UserStatsService', () => {
	let service: UserStatsService;
	const streakService = mock<StreakService>();

	const dbUserStats = partialMock<UserStatsWithRelations>({
		challengeRestores: 0,
		challengeRestoresResetAt: new Date(),
		currentStreakId: null,
		streakRestores: 0,
		streakRestoresResetAt: new Date(),
		updatedAt: new Date(),
		activeStreak: null,
		userId: 'user_1',
	});

	beforeEach(async () => {
		mockReset(prismaMock);
		mockReset(streakService);

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserStatsService,
				{ provide: PrismaService, useValue: prismaMock },
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
			prismaMock.userStats.findUnique.mockResolvedValue(null);
			prismaMock.userStats.create.mockResolvedValue(dbUserStats);

			const result = await service.syncUserStats('user_1', 'UTC');

			expect(prismaMock.userStats.findUnique).toHaveBeenCalledWith({
				where: { userId: 'user_1' },
				include: { activeStreak: true },
			});
			expect(prismaMock.userStats.create).toHaveBeenCalledWith({
				data: { userId: 'user_1' },
				include: { activeStreak: true },
			});
			expect(result).toBeInstanceOf(UserStatsDto);
			expect(result).toMatchObject({
				userId: 'user_1',
				challengeRestores: 0,
				streakRestores: 0,
			});
		});

		it('should return existing user stats if not need to update streak or challenge restores', async () => {
			prismaMock.userStats.findUnique.mockResolvedValue(dbUserStats);
			streakService.validateStreakExpiration.mockResolvedValue(false);

			jest.spyOn(service, 'resetChallengeRestores').mockReturnValue(null);
			jest.spyOn(service, 'getStreakUpdates').mockReturnValue(null);

			const result = await service.syncUserStats('user_1', 'UTC');

			expect(prismaMock.userStats.findUnique).toHaveBeenCalledWith({
				where: { userId: 'user_1' },
				include: { activeStreak: true },
			});
			expect(streakService.validateStreakExpiration).toHaveBeenCalledWith(
				'user_1',
				'UTC',
				undefined,
			);
			expect(result).toBeInstanceOf(UserStatsDto);
			expect(result).toMatchObject({
				userId: 'user_1',
				challengeRestores: 0,
				streakRestores: 0,
			});
		});

		it('should update user stats if streak was updated', async () => {
			prismaMock.userStats.findUnique.mockResolvedValue(dbUserStats);
			streakService.validateStreakExpiration.mockResolvedValue(true);
			prismaMock.userStats.updateMany.mockResolvedValue({
				count: 1,
			});

			jest.spyOn(service, 'resetChallengeRestores').mockReturnValue(null);
			jest.spyOn(service, 'getStreakUpdates').mockReturnValue({
				streakRestores: 2,
				streakRestoresResetAt: new Date(),
			});

			const result = await service.syncUserStats('user_1', 'UTC');

			expect(prismaMock.userStats.findUnique).toHaveBeenCalledWith({
				where: { userId: 'user_1' },
				include: { activeStreak: true },
			});
			expect(streakService.validateStreakExpiration).toHaveBeenCalledWith(
				'user_1',
				'UTC',
				undefined,
			);
			expect(prismaMock.userStats.updateMany).toHaveBeenCalledWith({
				where: {
					userId: 'user_1',
					streakRestoresResetAt: dbUserStats.streakRestoresResetAt,
				},
				data: {
					streakRestores: 2,
					streakRestoresResetAt: expect.any(Date),
				},
			});
			expect(result).toBeInstanceOf(UserStatsDto);
			expect(result).toMatchObject({
				userId: 'user_1',
				streakRestores: 2,
			});
		});
	});

	it('should fallback to findUnique if updateMany returns count 0', async () => {
		const updatedDbStats = partialMock<UserStatsWithRelations>({
			...dbUserStats,
			streakRestores: 2,
		});

		prismaMock.userStats.findUnique
			.mockResolvedValueOnce(dbUserStats)
			.mockResolvedValueOnce(updatedDbStats);

		streakService.validateStreakExpiration.mockResolvedValue(false);
		prismaMock.userStats.updateMany.mockResolvedValue({ count: 0 });

		jest.spyOn(service, 'resetChallengeRestores').mockReturnValue(null);
		jest.spyOn(service, 'getStreakUpdates').mockReturnValue({
			streakRestores: 2,
			streakRestoresResetAt: new Date(),
		});

		const result = await service.syncUserStats('user_1', 'UTC');

		expect(prismaMock.userStats.updateMany).toHaveBeenCalled();
		expect(prismaMock.userStats.findUnique).toHaveBeenCalledTimes(2);
		expect(result).toBeInstanceOf(UserStatsDto);
		expect(result).toMatchObject({
			userId: 'user_1',
			streakRestores: 2,
		});
	});

	describe('resetChallengeRestores', () => {
		it('should return null if now is before resetAt', () => {
			const stats = partialMock<UserStatsWithRelations>({
				...dbUserStats,
				challengeRestoresResetAt: appDayjs().add(1, 'day').toDate(),
			});

			const result = service.resetChallengeRestores(stats, new Date());
			expect(result).toBeNull();
		});

		it('should return 3 restores if missed an entire week', () => {
			const stats = partialMock<UserStatsWithRelations>({
				...dbUserStats,
				challengeRestoresResetAt: appDayjs().subtract(7, 'day').toDate(),
			});

			const result = service.resetChallengeRestores(stats, new Date());
			expect(result).toEqual({
				challengeRestores: 3,
				challengeRestoresResetAt: expect.any(Date),
			});
		});

		it('should return 3 restores if challengeRestores >= 2', () => {
			const stats = partialMock<UserStatsWithRelations>({
				...dbUserStats,
				challengeRestores: 2,
				challengeRestoresResetAt: appDayjs().subtract(1, 'day').toDate(),
			});

			const result = service.resetChallengeRestores(stats, new Date());
			expect(result).toEqual({
				challengeRestores: 3,
				challengeRestoresResetAt: expect.any(Date),
			});
		});

		it('should return 2 restores if challengeRestores < 2', () => {
			const stats = partialMock<UserStatsWithRelations>({
				...dbUserStats,
				challengeRestores: 1,
				challengeRestoresResetAt: appDayjs().subtract(1, 'day').toDate(),
			});

			const result = service.resetChallengeRestores(stats, new Date());
			expect(result).toEqual({
				challengeRestores: 2,
				challengeRestoresResetAt: expect.any(Date),
			});
		});
	});

	describe('getStreakUpdates', () => {
		it('should return null if now is before resetAt', () => {
			const stats = partialMock<UserStatsWithRelations>({
				...dbUserStats,
				streakRestoresResetAt: appDayjs().add(1, 'day').toDate(),
			});

			const result = service.getStreakUpdates(stats, new Date());
			expect(result).toBeNull();
		});

		it('should return streak updates if now is after resetAt', () => {
			const stats = partialMock<UserStatsWithRelations>({
				...dbUserStats,
				streakRestoresResetAt: appDayjs().subtract(1, 'day').toDate(),
			});

			const result = service.getStreakUpdates(stats, new Date());
			expect(result).toEqual({
				streakRestores: 2,
				streakRestoresResetAt: expect.any(Date),
			});
		});
	});
});
