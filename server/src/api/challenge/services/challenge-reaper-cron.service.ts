import { NotificationPublisherService } from '@api/notification/services/notification-publisher.service';
import { StatisticsPublisherService } from '@api/statistics/services/statistics-publisher.service';
import { StatisticsType } from '@api/statistics/types/statistics-type.types';
import {
	ChallengeStatus,
	ChallengeTaskStatus,
	NotificationType,
} from '@generated/prisma/enums';
import { PrismaService } from '@infra/prisma/prisma.service';
import { challengeTaskInclude } from '@libs/prisma/challenge-task.include.prisma';
import { appDayjs } from '@libs/utils/dayjs.util';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TaskPayload } from '../types/task-payload.types';
import { ChallengeActionService } from './challenge-action.service';

@Injectable()
export class ChallengeReaperCronService {
	private readonly logger = new Logger(ChallengeReaperCronService.name);

	constructor(
		private readonly prismaService: PrismaService,
		private readonly notificationPublisherService: NotificationPublisherService,
		private readonly challengeActionService: ChallengeActionService,
		private readonly statisticsPublisherService: StatisticsPublisherService,
	) {}

	@Cron(CronExpression.EVERY_HOUR)
	public async failExpiredTasks(): Promise<void> {
		try {
			const pendingTasks = await this.prismaService.challengeTask.findMany({
				where: {
					status: ChallengeTaskStatus.PENDING,
					userChallenge: { status: ChallengeStatus.ACTIVE },
				},
				include: { ...challengeTaskInclude.include },
			});

			for (const task of pendingTasks) {
				await this.processExpiredTask(task);
			}
		} catch (error) {
			this.logger.error('Error while failing expired tasks', error);
		}
	}

	@Cron(CronExpression.EVERY_HOUR)
	public async closeFrozenChallenges(): Promise<void> {
		this.logger.log(
			'Closing frozen challenges that exceeded the 48-hour limit...',
		);

		try {
			const deadline = appDayjs().subtract(48, 'hours').toDate();

			const frozenChallenges = await this.prismaService.userChallenge.findMany({
				where: { status: ChallengeStatus.FROZEN, frozenAt: { lte: deadline } },
			});

			if (frozenChallenges.length === 0) return;

			const userChallenges =
				await this.prismaService.userChallenge.updateManyAndReturn({
					where: { id: { in: frozenChallenges.map((c) => c.id) } },
					data: { status: ChallengeStatus.FAILED, frozenAt: null },
					include: {
						challenge: {
							select: { id: true, translations: { where: { language: 'en' } } },
						},
					},
				});

			for (const userChallenge of userChallenges) {
				const userId = userChallenge.userId;

				await this.notificationPublisherService.dispatchCreate({
					userId,
					type: NotificationType.CHALLENGE_FAILED,
					title: 'Challenge Failed',
					body: `Challenge "${userChallenge.challenge.translations[0].title}" has failed because it was frozen for more than 48 hours.`,
					challengeId: userChallenge.challengeId,
				});

				await this.statisticsPublisherService.dispatchStatisticsProcessing({
					type: StatisticsType.CHALLENGE_FAILED,
					data: { userId, entityId: userChallenge.challengeId },
				});
			}

			this.logger.log(
				`Closed ${frozenChallenges.length} frozen challenges that exceeded the 48-hour limit.`,
			);
		} catch (error) {
			this.logger.error('Error while closing frozen challenges', error);
		}
	}

	private async processExpiredTask(task: TaskPayload): Promise<void> {
		const userTimezone = task.userChallenge.user.timezone || 'UTC';
		const userNow = appDayjs().tz(userTimezone);

		const taskDeadline = appDayjs(task.date)
			.tz(userTimezone)
			.add(1, 'day')
			.hour(5)
			.minute(0)
			.second(0);

		if (userNow.isBefore(taskDeadline)) return;

		await this.challengeActionService.failChallengeTask(task, 'TIMEOUT');
	}
}
