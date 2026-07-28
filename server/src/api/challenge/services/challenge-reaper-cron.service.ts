import { Prisma } from '@generated/prisma/client';
import { ChallengeStatus, ChallengeTaskStatus } from '@generated/prisma/enums';
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
				challenge: true,
			},
		},
	},
} satisfies Prisma.ChallengeTaskDefaultArgs;

@Injectable()
export class ChallengeReaperCronService {
	private readonly logger = new Logger(ChallengeReaperCronService.name);

	constructor(private readonly prismaService: PrismaService) {}

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

			await this.prismaService.userChallenge.updateMany({
				where: { id: { in: frozenChallenges.map((c) => c.id) } },
				data: { status: ChallengeStatus.FAILED, frozenAt: null },
			});

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
			await this.prismaService.challengeTask.update({
				where: { id: task.id },
				data: { status: ChallengeTaskStatus.FAILED },
			});

			const hasRecoveriesLeft =
				task.userChallenge.usedRecoveries <
				task.userChallenge.challenge.maxRecoveries;

			if (hasRecoveriesLeft) {
				await tx.userChallenge.update({
					where: { id: task.userChallengeId },
					data: { status: ChallengeStatus.FAILED, frozenAt: null },
				});
			} else {
				await tx.userChallenge.update({
					where: { id: task.userChallengeId },
					data: { status: ChallengeStatus.FROZEN, frozenAt: new Date() },
				});
			}
		});
	}
}
