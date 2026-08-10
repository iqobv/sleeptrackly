import { CoinTransactionService } from '@api/coin-transaction/coin-transaction.service';
import { RewardProductService } from '@api/reward/services/reward-product.service';
import {
	AcquiredFrom,
	Challenge,
	ChallengeStatus,
	ChallengeTaskStatus,
	ChallengeType,
	CoinTransactionType,
	SleepEntry,
	UserChallenge,
} from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { DATE_FORMAT } from '@libs/constants/date-format.constants';
import { QUEUE_NAME } from '@libs/constants/queue.constants';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { ChallengePayloadDto } from '../dto/challenge-payload.dto';

dayjs.extend(utc);
dayjs.extend(timezone);

@Processor(QUEUE_NAME.CHALLENGES)
export class ChallengeProcessor extends WorkerHost {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly coinTransactionService: CoinTransactionService,
		private readonly rewardProductService: RewardProductService,
	) {
		super();
	}

	public async process(job: Job<ChallengePayloadDto>): Promise<void> {
		const { sleepEntryId, userId } = job.data;

		const sleepEntry = await this.prismaService.sleepEntry.findUnique({
			where: { id: sleepEntryId, userId },
		});

		if (!sleepEntry || !sleepEntry.isVerified) return;

		const activeChallenges = await this.prismaService.userChallenge.findMany({
			where: { userId, status: ChallengeStatus.ACTIVE },
			include: {
				challenge: true,
				challengeTasks: {
					where: {
						date: sleepEntry.dateForChart,
						status: ChallengeTaskStatus.PENDING,
					},
					orderBy: { date: 'asc' },
				},
			},
		});

		if (activeChallenges.length === 0) return;

		for (const userChallenge of activeChallenges) {
			const todaysTask = userChallenge.challengeTasks[0];

			if (!todaysTask) continue;

			const isValid = await this.validateChallengeCondition(
				userChallenge.challenge,
				sleepEntry,
				userId,
			);

			if (isValid) {
				await this.completeTaskWithRewards(
					userChallenge,
					todaysTask.id,
					sleepEntryId,
				);
			}
		}
	}

	private async validateChallengeCondition(
		challenge: Challenge,
		sleepEntry: SleepEntry,
		userId: string,
	): Promise<boolean> {
		const metadata = challenge.metadata as Record<string, string | number>;
		const userTimezone = sleepEntry.timezone || 'UTC';

		switch (challenge.type) {
			case ChallengeType.SLEEP_DURATION: {
				const minDuration = Number(metadata.minDurationMinutes);
				return sleepEntry.sleepDuration >= minDuration;
			}
			case ChallengeType.BEDTIME_CONSISTENCY: {
				const targetTime = String(metadata.targetTime);
				const margin = Number(metadata.marginMinutes);
				return this.isTimeWithinMargin(
					sleepEntry.sleepStart,
					targetTime,
					margin,
					userTimezone,
				);
			}
			case ChallengeType.WAKE_TIME_CONSISTENCY: {
				const targetTime = String(metadata.targetTime);
				const margin = Number(metadata.marginMinutes);
				return this.isTimeWithinMargin(
					sleepEntry.sleepEnd,
					targetTime,
					margin,
					userTimezone,
				);
			}
			case ChallengeType.BEDTIME_VARIANCE: {
				const maxVariance = Number(metadata.maxVarianceMinutes);
				const previousTaskDate = dayjs(sleepEntry.dateForChart)
					.subtract(1, 'day')
					.format(DATE_FORMAT);

				const previousSleepEntry =
					await this.prismaService.sleepEntry.findFirst({
						where: { userId, dateForChart: previousTaskDate, isVerified: true },
						orderBy: { createdAt: 'desc' },
					});

				if (!previousSleepEntry) return true;

				const currentBedtime = dayjs(sleepEntry.sleepStart).tz(userTimezone);
				const previousBedtime = dayjs(previousSleepEntry.sleepStart).tz(
					userTimezone,
				);

				const currentMinutes =
					currentBedtime.hour() * 60 + currentBedtime.minute();
				const previousMinutes =
					previousBedtime.hour() * 60 + previousBedtime.minute();

				let diff = Math.abs(currentMinutes - previousMinutes);

				if (diff > 720) diff = 1440 - diff;

				return diff <= maxVariance;
			}
			default:
				return false;
		}
	}

	private isTimeWithinMargin(
		actualTimeUtc: Date,
		targetTimeString: string,
		marginMinutes: number,
		timezone: string,
	): boolean {
		const actualLocal = dayjs(actualTimeUtc).tz(timezone);
		const actualMinutes = actualLocal.hour() * 60 + actualLocal.minute();
		const [targetHour, targetMinute] = targetTimeString.split(':').map(Number);
		const targetMinutes = targetHour * 60 + targetMinute;

		let diff = Math.abs(actualMinutes - targetMinutes);

		if (diff > 720) diff = 1440 - diff;

		return diff <= marginMinutes;
	}

	private async completeTaskWithRewards(
		userChallenge: UserChallenge & { challenge: Challenge },
		taskId: string,
		sleepEntryId: string,
	): Promise<void> {
		await this.prismaService.$transaction(async (tx) => {
			await tx.challengeTask.update({
				where: { id: taskId },
				data: { status: ChallengeStatus.COMPLETED, sleepEntryId },
			});

			await tx.userChallenge.update({
				where: { id: userChallenge.id },
				data: { progress: { increment: 1 } },
			});

			if (userChallenge.challenge.dailyRewardCoins > 0) {
				await this.coinTransactionService.createTransaction({
					amount: userChallenge.challenge.dailyRewardCoins,
					transactionType: CoinTransactionType.CHALLENGE_TASK_REWARD,
					userId: userChallenge.userId,
					referenceId: taskId,
				});
			}

			const pendingTasks = await tx.challengeTask.findMany({
				where: {
					userChallengeId: userChallenge.id,
					status: ChallengeTaskStatus.PENDING,
				},
			});

			if (pendingTasks.length === 0) {
				await tx.userChallenge.update({
					where: { id: userChallenge.id },
					data: { status: ChallengeStatus.COMPLETED },
				});

				if (userChallenge.challenge.rewardCoins > 0) {
					await this.coinTransactionService.createTransaction({
						amount: userChallenge.challenge.rewardCoins,
						transactionType: CoinTransactionType.CHALLENGE_REWARD,
						userId: userChallenge.userId,
						referenceId: userChallenge.id,
					});
				}

				if (userChallenge.challenge.rewardProductId) {
					await this.rewardProductService.rewardProduct(
						userChallenge.challenge.rewardProductId,
						userChallenge.userId,
						AcquiredFrom.CHALLENGE_REWARD,
					);
				}
			}
		});
	}
}
