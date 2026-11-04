import { PrismaService } from '@infra/prisma/prisma.service';
import { DATE_FORMAT } from '@libs/constants/date-format.constants';
import { QUEUE_NAME } from '@libs/constants/queue.constants';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { StatisticsQueuePayloadDto } from '../dto/statistics-queue-payload.dto';
import { StatisticsType } from '../types/statistics-type.types';

dayjs.extend(isoWeek);

@Processor(QUEUE_NAME.STATISTICS, {
	concurrency: 5,
})
export class StatisticsProcessor extends WorkerHost {
	private readonly logger = new Logger(StatisticsProcessor.name);

	private readonly ACTIVE_DAYS_THRESHOLD = 3;

	constructor(private readonly prismaService: PrismaService) {
		super();
	}

	public async process(job: Job<StatisticsQueuePayloadDto>): Promise<void> {
		const { type, data } = job.data;

		const now = dayjs();
		const currentYear = now.year();
		const currentWeek = now.isoWeek();

		switch (type) {
			case StatisticsType.USER_REGISTERED:
				await this.handleUserRegistered(currentYear, currentWeek);
				break;

			case StatisticsType.SLEEP_ENTRY_ADDED:
				if (!data.date) {
					throw new Error(
						`Date is required for ${StatisticsType.SLEEP_ENTRY_ADDED} statistics processing`,
					);
				}

				await this.handleSleepEntryAdded(data.userId, data.date);
				break;

			case StatisticsType.ACHIEVEMENT_UNLOCKED:
				await this.handleAchievementUnlocked(currentYear, currentWeek);
				break;

			case StatisticsType.CHALLENGE_STARTED:
				await this.handleChallengeStarted(currentYear, currentWeek);
				break;

			case StatisticsType.CHALLENGE_COMPLETED:
				await this.handleChallengeCompleted(currentYear, currentWeek);
				break;

			case StatisticsType.CHALLENGE_FAILED:
				await this.handleChallengeFailed(currentYear, currentWeek);
				break;

			case StatisticsType.PURCHASE_MADE:
				await this.handlePurchaseMade(currentYear, currentWeek);
				break;

			default:
				this.logger.warn(`Unhandled statistics type: ${type}`);
				break;
		}
	}

	private async handleUserRegistered(
		year: number,
		isoWeek: number,
	): Promise<void> {
		await this.prismaService.weeklyStatistics.upsert({
			where: {
				year_isoWeek: { year, isoWeek },
			},
			update: {
				registeredCount: { increment: 1 },
			},
			create: {
				year,
				isoWeek,
				registeredCount: 1,
			},
		});
	}

	private async handleSleepEntryAdded(
		userId: string,
		date: string,
	): Promise<void> {
		const entryDate = dayjs(date, DATE_FORMAT);

		const year = entryDate.year();
		const isoWeek = entryDate.isoWeek();

		const startOfWeek = entryDate.startOf('isoWeek').format(DATE_FORMAT);
		const endOfWeek = entryDate.endOf('isoWeek').format(DATE_FORMAT);

		const uniqueDays = await this.prismaService.sleepEntry.groupBy({
			by: ['dateForChart'],
			where: {
				userId,
				isVerified: true,
				dateForChart: {
					gte: startOfWeek,
					lte: endOfWeek,
				},
			},
		});

		if (uniqueDays.length === this.ACTIVE_DAYS_THRESHOLD) {
			await this.prismaService.weeklyStatistics.upsert({
				where: {
					year_isoWeek: { year, isoWeek },
				},
				update: {
					activeUsersCount: { increment: 1 },
				},
				create: {
					year,
					isoWeek,
					activeUsersCount: 1,
				},
			});
		}
	}

	private async handleAchievementUnlocked(
		year: number,
		isoWeek: number,
	): Promise<void> {
		await this.prismaService.weeklyStatistics.upsert({
			where: {
				year_isoWeek: { year, isoWeek },
			},
			update: {
				achievementsCount: { increment: 1 },
			},
			create: {
				year,
				isoWeek,
				achievementsCount: 1,
			},
		});
	}

	private async handleChallengeStarted(
		year: number,
		isoWeek: number,
	): Promise<void> {
		await this.prismaService.weeklyStatistics.upsert({
			where: {
				year_isoWeek: { year, isoWeek },
			},
			update: {
				challengesStartedCount: { increment: 1 },
			},
			create: {
				year,
				isoWeek,
				challengesStartedCount: 1,
			},
		});
	}

	private async handleChallengeCompleted(
		year: number,
		isoWeek: number,
	): Promise<void> {
		await this.prismaService.weeklyStatistics.upsert({
			where: {
				year_isoWeek: { year, isoWeek },
			},
			update: {
				challengesCompletedCount: { increment: 1 },
			},
			create: {
				year,
				isoWeek,
				challengesCompletedCount: 1,
			},
		});
	}

	private async handleChallengeFailed(
		year: number,
		isoWeek: number,
	): Promise<void> {
		await this.prismaService.weeklyStatistics.upsert({
			where: {
				year_isoWeek: { year, isoWeek },
			},
			update: {
				challengesFailedCount: { increment: 1 },
			},
			create: {
				year,
				isoWeek,
				challengesFailedCount: 1,
			},
		});
	}

	private async handlePurchaseMade(
		year: number,
		isoWeek: number,
	): Promise<void> {
		await this.prismaService.weeklyStatistics.upsert({
			where: {
				year_isoWeek: { year, isoWeek },
			},
			update: {
				purchasesCount: { increment: 1 },
			},
			create: {
				year,
				isoWeek,
				purchasesCount: 1,
			},
		});
	}
}
