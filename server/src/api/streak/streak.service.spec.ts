import { UserStatsDto } from '@api/user-stats/dto/user-stats.dto';
import { StreakStatus } from '@generated/prisma/enums';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';
import {
	BadRequestException,
	InternalServerErrorException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import dayjs from 'dayjs';
import { BaseStreakDto } from './dto/streak.dto';
import { StreakService } from './streak.service';

type PrismaMock = {
	userStats: { findUnique: jest.Mock; update: jest.Mock };
	sleepEntry: { groupBy: jest.Mock };
	streak: { create: jest.Mock; update: jest.Mock };
	$transaction: jest.Mock;
};

describe('StreakService', () => {
	let service: StreakService;
	let prisma: PrismaMock;

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

	const internalUserStats = {
		...userStats,
		user: {
			id: 'user_1',
			timezone: 'UTC',
		},
	};

	const streak: BaseStreakDto = {
		createdAt: new Date(),
		endDate: null,
		id: 'streak_1',
		lastActivityDate: '2026-10-20',
		lastRestoredAt: null,
		length: 3,
		restoresUsed: 0,
		startDate: new Date('2026-10-18'),
		status: 'ACTIVE',
		updatedAt: new Date(),
		userId: 'user_1',
	};

	const userStatsWithStreak = {
		...internalUserStats,
		activeStreak: streak,
	};

	const mockNowStr = '2026-10-20';
	const mockNowDate = new Date(`${mockNowStr}T12:00:00Z`);

	beforeEach(async () => {
		jest.useFakeTimers().setSystemTime(mockNowDate);

		prisma = {
			userStats: { findUnique: jest.fn(), update: jest.fn() },
			sleepEntry: { groupBy: jest.fn() },
			streak: { create: jest.fn(), update: jest.fn() },
			$transaction: jest.fn((callback) => callback(prisma)),
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [StreakService, { provide: PrismaService, useValue: prisma }],
		}).compile();

		service = module.get<StreakService>(StreakService);
	});

	afterEach(() => {
		jest.clearAllMocks();
		jest.useRealTimers();
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('calculateStreak', () => {
		it('should throw an InternalServerErrorException if userStats is not found', async () => {
			prisma.userStats.findUnique.mockResolvedValue(null);

			await expect(service.calculateStreak('userId')).rejects.toThrow(
				InternalServerErrorException,
			);
		});

		describe('createStreak (private method called when no streak exists)', () => {
			it('should create a new streak if there are 3 consecutive days ending today', async () => {
				prisma.userStats.findUnique.mockResolvedValue(internalUserStats);
				prisma.sleepEntry.groupBy.mockResolvedValue([
					{ dateForChart: '2026-10-20' },
					{ dateForChart: '2026-10-19' },
					{ dateForChart: '2026-10-18' },
				]);
				prisma.streak.create.mockResolvedValue(streak);

				await service.calculateStreak('user_1');

				expect(prisma.streak.create).toHaveBeenCalledWith({
					data: {
						userId: 'user_1',
						startDate: dayjs('2026-10-18').toDate(),
						length: 3,
						restoresUsed: 0,
						lastActivityDate: '2026-10-20',
						status: 'ACTIVE',
					},
				});
				expect(prisma.userStats.update).toHaveBeenCalledWith({
					where: { userId: 'user_1' },
					data: {
						activeStreak: { connect: { id: 'streak_1' } },
					},
				});
			});

			it('should not create a streak if the last 3 days are not consecutive', async () => {
				prisma.userStats.findUnique.mockResolvedValue(internalUserStats);
				prisma.sleepEntry.groupBy.mockResolvedValue([
					{ dateForChart: '2026-10-20' },
					{ dateForChart: '2026-10-18' },
					{ dateForChart: '2026-10-17' },
				]);

				await service.calculateStreak('user_1');

				expect(prisma.streak.create).not.toHaveBeenCalled();
			});
		});

		describe('updateExistingStreak (private method called when streak exists)', () => {
			it('should increment length if missedDays === 0 (user logged today/yesterday)', async () => {
				prisma.userStats.findUnique.mockResolvedValue({
					...internalUserStats,
					activeStreak: { ...streak, lastActivityDate: '2026-10-19' },
				});

				await service.calculateStreak('user_1');

				expect(prisma.streak.update).toHaveBeenCalledWith({
					where: { id: 'streak_1' },
					data: {
						lastActivityDate: '2026-10-20',
						length: { increment: 1 },
					},
				});
			});

			it('should freeze streak if missedDays === 1 and streak is ACTIVE', async () => {
				prisma.userStats.findUnique.mockResolvedValue({
					...internalUserStats,
					activeStreak: { ...streak, lastActivityDate: '2026-10-18' },
				});

				await service.calculateStreak('user_1');

				expect(prisma.streak.update).toHaveBeenCalledWith({
					where: { id: 'streak_1' },
					data: { status: StreakStatus.FROZEN },
				});
			});

			it('should end steak if missedDays > 1', async () => {
				prisma.userStats.findUnique.mockResolvedValue({
					...internalUserStats,
					activeStreak: { ...streak, lastActivityDate: '2026-10-17' },
				});

				await service.calculateStreak('user_1');

				expect(prisma.streak.update).toHaveBeenCalledWith({
					where: { id: 'streak_1' },
					data: {
						status: StreakStatus.ENDED,
						endDate: dayjs('2026-10-17').toDate(),
					},
				});
				expect(prisma.userStats.update).toHaveBeenCalledWith({
					where: { userId: 'user_1' },
					data: { currentStreakId: null },
				});
			});
		});
	});

	describe('validateStreakExpiration', () => {
		it('should return false if streak is missing or ended', async () => {
			const endedStreak = { ...streak, status: StreakStatus.ENDED };
			const result1 = await service.validateStreakExpiration(
				'user_1',
				'UTC',
				undefined,
			);
			const result2 = await service.validateStreakExpiration(
				'user_1',
				'UTC',
				endedStreak,
			);

			expect(result1).toBe(false);
			expect(result2).toBe(false);
		});

		it('should return true and trigger calculation if streak needs freezing', async () => {
			jest.spyOn(service, 'calculateStreak').mockResolvedValue(undefined);

			const result = await service.validateStreakExpiration('user_1', 'UTC', {
				...streak,
				lastActivityDate: '2026-10-18',
			});

			expect(result).toBe(true);
			expect(service.calculateStreak).toHaveBeenCalledWith('user_1');
		});

		it('should return false if streak is still valid', async () => {
			const result = await service.validateStreakExpiration('user_1', 'UTC', {
				...streak,
				lastActivityDate: '2026-10-19',
			});

			expect(result).toBe(false);
		});
	});

	describe('restoreStreak', () => {
		it('should throw BadRequestException if no active streak exists', async () => {
			prisma.userStats.findUnique.mockResolvedValue(null);

			await expect(service.restoreStreak('user_1')).rejects.toThrow(
				new BadRequestException(ERROR_MESSAGES.STREAK.NO_ACTIVE_STREAK),
			);
		});

		it('should throw BadRequestException if user has 0 streakRestores', async () => {
			prisma.userStats.findUnique.mockResolvedValue({
				...userStats,
				activeStreak: { ...streak, status: StreakStatus.FROZEN },
				streakRestores: 0,
			});

			await expect(service.restoreStreak('user_1')).rejects.toThrow(
				new BadRequestException(ERROR_MESSAGES.STREAK.NOT_ENOUGH_RESTORES),
			);
		});

		it('should throw BadRequestException if streak is already ENDED', async () => {
			prisma.userStats.findUnique.mockResolvedValue({
				...userStats,
				activeStreak: { ...streak, status: StreakStatus.ENDED },
				streakRestores: 1,
			});

			await expect(service.restoreStreak('user_1')).rejects.toThrow(
				new BadRequestException(ERROR_MESSAGES.STREAK.ALREADY_ENDED),
			);
		});

		it('should throw BadRequestException if streak is already ACTIVE', async () => {
			prisma.userStats.findUnique.mockResolvedValue({
				...userStats,
				activeStreak: { ...streak, status: StreakStatus.ACTIVE },
				streakRestores: 1,
			});

			await expect(service.restoreStreak('user_1')).rejects.toThrow(
				new BadRequestException(ERROR_MESSAGES.STREAK.ALREADY_ACTIVE),
			);
		});

		it('should restore streak successfully if it is FROZEN and user has restores', async () => {
			prisma.userStats.findUnique.mockResolvedValue({
				...userStats,
				activeStreak: { ...streak, status: StreakStatus.FROZEN },
				streakRestores: 1,
			});

			const result = await service.restoreStreak('user_1');

			expect(prisma.userStats.update).toHaveBeenCalledWith({
				where: { userId: 'user_1' },
				data: {
					streakRestores: { decrement: 1 },
					activeStreak: {
						update: {
							status: StreakStatus.ACTIVE,
							lastRestoredAt: expect.any(Date),
						},
					},
				},
			});
			expect(result).toEqual(SUCCESS_MESSAGES.STREAK.STREAK_RESTORED);
		});
	});
});
