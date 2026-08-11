import { NotificationPublisherService } from '@api/notification/services/notification-publisher.service';
import { Prisma } from '@generated/prisma/client';
import {
	ChallengeStatus,
	ChallengeTaskStatus,
	NotificationType,
} from '@generated/prisma/enums';
import { PrismaService } from '@infra/prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

const challengeTaskInclude = {
	include: {
		userChallenge: {
			include: {
				user: { select: { id: true, timezone: true } },
				challenge: { include: { translations: { where: { language: 'en' } } } },
			},
		},
	},
} satisfies Prisma.ChallengeTaskDefaultArgs;

@Injectable()
export class ChallengeReaperCronService {
	private readonly logger = new Logger(ChallengeReaperCronService.name);

	constructor(
		private readonly prismaService: PrismaService,
		private readonly notificationPublisherService: NotificationPublisherService,
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
			const deadline = dayjs().subtract(48, 'hours').toDate();

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
				await this.notificationPublisherService.dispatchCreate({
					userId: userChallenge.userId,
					type: NotificationType.CHALLENGE_FAILED,
					title: 'Challenge Failed',
					body: `Challenge "${userChallenge.challenge.translations[0].title}" has failed because it was frozen for more than 48 hours.`,
					challengeId: userChallenge.challengeId,
				});
			}

			this.logger.log(
				`Closed ${frozenChallenges.length} frozen challenges that exceeded the 48-hour limit.`,
			);
		} catch (error) {
			this.logger.error('Error while closing frozen challenges', error);
		}
	}

	private async processExpiredTask(
		task: Prisma.ChallengeTaskGetPayload<typeof challengeTaskInclude>,
	): Promise<void> {
		const userTimezone = task.userChallenge.user.timezone || 'UTC';
		const userNow = dayjs().tz(userTimezone);

		const taskDeadline = dayjs(task.date)
			.tz(userTimezone)
			.add(1, 'day')
			.hour(5)
			.minute(0)
			.second(0);

		if (userNow.isBefore(taskDeadline)) return;

		await this.prismaService.$transaction(async (tx) => {
			await tx.challengeTask.update({
				where: { id: task.id },
				data: { status: ChallengeTaskStatus.FAILED },
			});

			const hasRecoveriesLeft =
				task.userChallenge.usedRecoveries <
				task.userChallenge.challenge.maxRecoveries;

			if (hasRecoveriesLeft) {
				await tx.userChallenge.update({
					where: { id: task.userChallengeId },
					data: { status: ChallengeStatus.FROZEN, frozenAt: new Date() },
				});

				await this.notificationPublisherService.dispatchCreate({
					userId: task.userChallenge.userId,
					type: NotificationType.CHALLENGE_FROZEN,
					title: 'Challenge Frozen',
					body: `Your challenge "${task.userChallenge.challenge.translations[0].title}" has been frozen because you missed a task. You have ${task.userChallenge.challenge.maxRecoveries - task.userChallenge.usedRecoveries} recoveries left.`,
					challengeId: task.userChallenge.challengeId,
				});
			} else {
				await tx.userChallenge.update({
					where: { id: task.userChallengeId },
					data: { status: ChallengeStatus.FAILED, frozenAt: null },
				});

				await this.notificationPublisherService.dispatchCreate({
					userId: task.userChallenge.userId,
					type: NotificationType.CHALLENGE_FAILED,
					title: 'Challenge Failed',
					body: `Your challenge "${task.userChallenge.challenge.translations[0].title}" has failed because you missed a task and have no recoveries left.`,
					challengeId: task.userChallenge.challengeId,
				});
			}
		});
	}
}
