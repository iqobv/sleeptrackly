import { AchievementsPublisherService } from '@api/achievement/services/achievements-publisher.service';
import { NotificationPublisherService } from '@api/notification/services/notification-publisher.service';
import { Prisma, Streak } from '@generated/prisma/client';
import {
	AchievementType,
	NotificationType,
	Platform,
	StreakStatus,
} from '@generated/prisma/enums';
import { PrismaService } from '@infra/prisma/prisma.service';
import { DATE_FORMAT } from '@libs/constants/date-format.constants';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import { appDayjs } from '@libs/utils/dayjs.util';
import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class StreakService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly notificationPublisherService: NotificationPublisherService,
		private readonly achievementsPublisherService: AchievementsPublisherService,
	) {}

	public async calculateStreak(
		userId: string,
		externalTx?: Prisma.TransactionClient,
	): Promise<void> {
		const execute = async (tx: Prisma.TransactionClient): Promise<void> => {
			const userStats = await tx.userStats.findUnique({
				where: { userId },
				include: {
					activeStreak: true,
					user: {
						select: {
							id: true,
							timezone: true,
						},
					},
				},
			});

			if (!userStats) throw new InternalServerErrorException();

			const streak = userStats.activeStreak;

			const now = appDayjs().tz(userStats.user.timezone).format(DATE_FORMAT);

			if (!streak) {
				await this.createStreak(userId, now, tx);
			} else {
				await this.updateExistingStreak(userId, now, streak, tx);
			}
		};

		if (externalTx) {
			await execute(externalTx);
		} else {
			await this.prismaService.$transaction(execute);
		}

		await this.achievementsPublisherService.dispatchProgressCheck({
			type: AchievementType.STREAK,
			userId,
		});
	}

	public async validateStreakExpiration(
		userId: string,
		timezone: string,
		streak?: Streak,
	): Promise<boolean> {
		if (!streak || streak.status === StreakStatus.ENDED) return false;

		const now = appDayjs().tz(timezone).format(DATE_FORMAT);

		const diffInDays = appDayjs(now).diff(
			appDayjs(streak.lastActivityDate),
			'day',
		);
		const missedDays = diffInDays - 1;

		const needsUpdate =
			(missedDays === 1 && streak.status === StreakStatus.ACTIVE) ||
			missedDays > 1;

		if (needsUpdate) {
			await this.calculateStreak(userId);
			return true;
		}

		return false;
	}

	public async restoreStreak(
		userId: string,
		platform?: Platform,
	): Promise<MessageResponse> {
		const userStats = await this.prismaService.userStats.findUnique({
			where: { userId },
			include: {
				activeStreak: true,
			},
		});

		if (!userStats || !userStats.activeStreak)
			throw new BadRequestException(ERROR_MESSAGES.STREAK.NO_ACTIVE_STREAK);

		if (userStats.streakRestores <= 0)
			throw new BadRequestException(ERROR_MESSAGES.STREAK.NOT_ENOUGH_RESTORES);

		const streak = userStats.activeStreak;

		if (streak.status === StreakStatus.ENDED)
			throw new BadRequestException(ERROR_MESSAGES.STREAK.ALREADY_ENDED);

		if (streak.status === StreakStatus.ACTIVE)
			throw new BadRequestException(ERROR_MESSAGES.STREAK.ALREADY_ACTIVE);

		await this.prismaService.$transaction(async (tx) => {
			await tx.userStats.update({
				where: { userId },
				data: {
					streakRestores: { decrement: 1 },
					activeStreak: {
						update: {
							status: StreakStatus.ACTIVE,
							lastRestoredAt: appDayjs.utc().toDate(),
						},
					},
				},
			});
		});

		await this.achievementsPublisherService.dispatchProgressCheck({
			type: AchievementType.STREAK,
			userId,
			platform,
		});

		return SUCCESS_MESSAGES.STREAK.STREAK_RESTORED;
	}

	private async createStreak(
		userId: string,
		now: string,
		tx?: Prisma.TransactionClient,
	): Promise<void> {
		const prisma = tx ?? this.prismaService;

		const sleepEntries = await prisma.sleepEntry.groupBy({
			by: ['dateForChart'],
			take: 3,
			where: {
				userId,
				isVerified: true,
			},
			orderBy: {
				dateForChart: 'desc',
			},
		});

		if (sleepEntries.length === 3) {
			const day1 = sleepEntries[0].dateForChart;
			const day2 = sleepEntries[1].dateForChart;
			const day3 = sleepEntries[2].dateForChart;

			const isConsecutive =
				appDayjs(day1).diff(appDayjs(day2), 'day') === 1 &&
				appDayjs(day2).diff(appDayjs(day3), 'day') === 1;

			if (isConsecutive && day1 === now) {
				const createdStreak = await prisma.streak.create({
					data: {
						lastActivityDate: day1,
						userId,
						startDate: appDayjs(day3).toDate(),
						length: 3,
						restoresUsed: 0,
						status: StreakStatus.ACTIVE,
					},
				});

				await prisma.userStats.update({
					where: { userId },
					data: {
						activeStreak: { connect: { id: createdStreak.id } },
					},
				});
			}
		}
	}

	private async updateExistingStreak(
		userId: string,
		now: string,
		streak: Streak,
		tx?: Prisma.TransactionClient,
	): Promise<void> {
		const prisma = tx ?? this.prismaService;

		const diffInDays = appDayjs(now).diff(
			appDayjs(streak.lastActivityDate),
			'day',
		);
		const missedDays = diffInDays - 1;

		if (missedDays < 0) return;

		const id = streak.id;

		if (missedDays === 0) {
			await prisma.streak.update({
				where: { id },
				data: {
					lastActivityDate: now,
					length: { increment: 1 },
				},
			});
		} else if (missedDays === 1 && streak.status === StreakStatus.ACTIVE) {
			await prisma.streak.update({
				where: { id },
				data: {
					status: StreakStatus.FROZEN,
				},
			});

			await this.notificationPublisherService.dispatchCreate({
				title: 'Streak Frozen',
				type: NotificationType.STREAK_FROZEN,
				body: 'Your sleep streak has been frozen due to inactivity. You have 1 day to restore it.',
				userId,
				showInApp: true,
			});
		} else if (missedDays > 1 && streak.status !== StreakStatus.ENDED) {
			await prisma.streak.update({
				where: { id },
				data: {
					status: StreakStatus.ENDED,
					endDate: appDayjs(streak.lastActivityDate).toDate(),
				},
			});

			await prisma.userStats.update({
				where: { userId },
				data: {
					currentStreakId: null,
				},
			});

			await this.notificationPublisherService.dispatchCreate({
				title: 'Streak Ended',
				type: NotificationType.STREAK_ENDED,
				body: 'Your sleep streak has ended due to inactivity.',
				userId,
				showInApp: true,
			});
		}
	}
}
