import { AchievementsPublisherService } from '@api/achievement/services/achievements-publisher.service';
import { NotificationPublisherService } from '@api/notification/services/notification-publisher.service';
import { Streak, User, UserStats } from '@generated/prisma/client';
import { StreakStatus } from '@generated/prisma/enums';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';
import { prismaMock } from '@libs/prisma/prisma.mock';
import { appDayjs } from '@libs/utils/dayjs.util';
import { partialMock } from '@libs/utils/mock-helper.util';
import {
	BadRequestException,
	InternalServerErrorException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mock, mockReset } from 'jest-mock-extended';
import { StreakService } from './streak.service';

type UserStatsWithRelations = UserStats & {
	user?: Partial<User>;
	activeStreak?: Partial<Streak> | null;
};

describe('StreakService', () => {
	let service: StreakService;
	const notificationPublisherService = mock<NotificationPublisherService>();
	const achievementsPublisherService = mock<AchievementsPublisherService>();

	const userStats = partialMock<UserStatsWithRelations>({
		activeStreak: null,
		challengeRestores: 0,
		challengeRestoresResetAt: new Date(),
		currentStreakId: null,
		streakRestores: 0,
		streakRestoresResetAt: new Date(),
		userId: 'user_1',
		updatedAt: new Date(),
	});

	const internalUserStats = partialMock<UserStatsWithRelations>({
		...userStats,
		user: {
			id: 'user_1',
			timezone: 'UTC',
		},
	});

	const streak = partialMock<Streak>({
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
	});

	const mockNowStr = '2026-10-20';
	const mockNowDate = new Date(`${mockNowStr}T12:00:00Z`);

	beforeAll(() => {
		jest.useFakeTimers().setSystemTime(mockNowDate);
	});

	afterAll(() => {
		jest.useRealTimers();
	});

	beforeEach(async () => {
		mockReset(prismaMock);
		mockReset(notificationPublisherService);
		mockReset(achievementsPublisherService);

		prismaMock.$transaction.mockImplementation(async (cb) => cb(prismaMock));

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				StreakService,
				{ provide: PrismaService, useValue: prismaMock },
				{
					provide: NotificationPublisherService,
					useValue: notificationPublisherService,
				},
				{
					provide: AchievementsPublisherService,
					useValue: achievementsPublisherService,
				},
			],
		}).compile();

		service = module.get<StreakService>(StreakService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('calculateStreak', () => {
		it('should throw an InternalServerErrorException if userStats is not found', async () => {
			prismaMock.userStats.findUnique.mockResolvedValue(null);

			await expect(service.calculateStreak('userId')).rejects.toThrow(
				InternalServerErrorException,
			);
		});

		describe('createStreak', () => {
			it('should create a new streak if there are 3 consecutive days ending today', async () => {
				prismaMock.userStats.findUnique.mockResolvedValue(internalUserStats);
				(prismaMock.sleepEntry.groupBy as jest.Mock).mockResolvedValue([
					{ dateForChart: '2026-10-20' },
					{ dateForChart: '2026-10-19' },
					{ dateForChart: '2026-10-18' },
				]);

				prismaMock.streak.create.mockResolvedValue(
					partialMock<Streak>({ id: 'streak_1' }),
				);

				await service.calculateStreak('user_1');

				expect(prismaMock.streak.create).toHaveBeenCalledWith({
					data: {
						userId: 'user_1',
						startDate: appDayjs('2026-10-18').toDate(),
						length: 3,
						restoresUsed: 0,
						lastActivityDate: '2026-10-20',
						status: 'ACTIVE',
					},
				});
				expect(prismaMock.userStats.update).toHaveBeenCalledWith({
					where: { userId: 'user_1' },
					data: {
						activeStreak: { connect: { id: 'streak_1' } },
					},
				});
			});
			it('should not create a streak if the last 3 days are not consecutive', async () => {
				prismaMock.userStats.findUnique.mockResolvedValue(internalUserStats);
				(prismaMock.sleepEntry.groupBy as jest.Mock).mockResolvedValue([
					{ dateForChart: '2026-10-20' },
					{ dateForChart: '2026-10-18' },
					{ dateForChart: '2026-10-17' },
				]);

				await service.calculateStreak('user_1');

				expect(prismaMock.streak.create).not.toHaveBeenCalled();
			});
		});

		describe('updateExistingStreak', () => {
			it('should increment length if missedDays === 0', async () => {
				prismaMock.userStats.findUnique.mockResolvedValue(
					partialMock<UserStatsWithRelations>({
						...internalUserStats,
						activeStreak: { ...streak, lastActivityDate: '2026-10-19' },
					}),
				);

				await service.calculateStreak('user_1');

				expect(prismaMock.streak.update).toHaveBeenCalledWith({
					where: { id: 'streak_1' },
					data: {
						lastActivityDate: '2026-10-20',
						length: { increment: 1 },
					},
				});
			});

			it('should freeze streak if missedDays === 1 and streak is ACTIVE', async () => {
				prismaMock.userStats.findUnique.mockResolvedValue(
					partialMock<UserStatsWithRelations>({
						...internalUserStats,
						activeStreak: { ...streak, lastActivityDate: '2026-10-18' },
					}),
				);

				await service.calculateStreak('user_1');

				expect(prismaMock.streak.update).toHaveBeenCalledWith({
					where: { id: 'streak_1' },
					data: { status: StreakStatus.FROZEN },
				});
			});

			it('should end steak if missedDays > 1', async () => {
				prismaMock.userStats.findUnique.mockResolvedValue(
					partialMock<UserStatsWithRelations>({
						...internalUserStats,
						activeStreak: { ...streak, lastActivityDate: '2026-10-17' },
					}),
				);

				await service.calculateStreak('user_1');

				expect(prismaMock.streak.update).toHaveBeenCalledWith({
					where: { id: 'streak_1' },
					data: {
						status: StreakStatus.ENDED,
						endDate: appDayjs('2026-10-17').toDate(),
					},
				});
				expect(prismaMock.userStats.update).toHaveBeenCalledWith({
					where: { userId: 'user_1' },
					data: { currentStreakId: null },
				});
			});
		});
	});

	describe('validateStreakExpiration', () => {
		it('should return false if streak is missing or ended', async () => {
			const endedStreak = partialMock<Streak>({
				...streak,
				status: StreakStatus.ENDED,
			});
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
			prismaMock.userStats.findUnique.mockResolvedValue(null);

			await expect(service.restoreStreak('user_1')).rejects.toThrow(
				new BadRequestException(ERROR_MESSAGES.STREAK.NO_ACTIVE_STREAK),
			);
		});

		it('should throw BadRequestException if user has 0 streakRestores', async () => {
			prismaMock.userStats.findUnique.mockResolvedValue(
				partialMock<UserStatsWithRelations>({
					...userStats,
					activeStreak: { ...streak, status: StreakStatus.FROZEN },
					streakRestores: 0,
				}),
			);

			await expect(service.restoreStreak('user_1')).rejects.toThrow(
				new BadRequestException(ERROR_MESSAGES.STREAK.NOT_ENOUGH_RESTORES),
			);
		});

		it('should throw BadRequestException if streak is already ENDED', async () => {
			prismaMock.userStats.findUnique.mockResolvedValue(
				partialMock<UserStatsWithRelations>({
					...userStats,
					activeStreak: { ...streak, status: StreakStatus.ENDED },
					streakRestores: 1,
				}),
			);

			await expect(service.restoreStreak('user_1')).rejects.toThrow(
				new BadRequestException(ERROR_MESSAGES.STREAK.ALREADY_ENDED),
			);
		});

		it('should throw BadRequestException if streak is already ACTIVE', async () => {
			prismaMock.userStats.findUnique.mockResolvedValue(
				partialMock<UserStatsWithRelations>({
					...userStats,
					activeStreak: { ...streak, status: StreakStatus.ACTIVE },
					streakRestores: 1,
				}),
			);

			await expect(service.restoreStreak('user_1')).rejects.toThrow(
				new BadRequestException(ERROR_MESSAGES.STREAK.ALREADY_ACTIVE),
			);
		});

		it('should restore streak successfully if it is FROZEN and user has restores', async () => {
			prismaMock.userStats.findUnique.mockResolvedValue(
				partialMock<UserStatsWithRelations>({
					...userStats,
					activeStreak: { ...streak, status: StreakStatus.FROZEN },
					streakRestores: 1,
				}),
			);

			const result = await service.restoreStreak('user_1');

			expect(prismaMock.userStats.update).toHaveBeenCalledWith({
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
