import { Platform } from '@generated/prisma/enums';
import { PrismaService } from '@infra/prisma/prisma.service';
import { DATE_FORMAT } from '@libs/constants/date-format.constants';
import { QUEUE_NAME } from '@libs/constants/queue.constants';
import { appDayjs } from '@libs/utils/dayjs.util';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { StatisticsQueuePayloadDto } from '../dto/statistics-queue-payload.dto';
import { BaseStatisticsParams } from '../interfaces/base-statistics-params.interface';
import { StatisticsType } from '../types/statistics-type.types';

@Processor(QUEUE_NAME.STATISTICS, {
	concurrency: 5,
})
export class StatisticsProcessor extends WorkerHost {
	private readonly logger = new Logger(StatisticsProcessor.name);

	constructor(private readonly prismaService: PrismaService) {
		super();
	}

	public async process(job: Job<StatisticsQueuePayloadDto>): Promise<void> {
		const { type, data } = job.data;

		const now = appDayjs.utc().format(DATE_FORMAT);
		const platform = data.platform ?? Platform.WEB;

		const statisticsParams: BaseStatisticsParams = {
			date: now,
			platform,
		};

		switch (type) {
			case StatisticsType.USER_REGISTERED:
				await this.handleUserRegistered(statisticsParams);
				break;

			case StatisticsType.ACHIEVEMENT_UNLOCKED:
				await this.handleAchievementUnlocked(statisticsParams);
				break;

			case StatisticsType.CHALLENGE_STARTED:
				await this.handleChallengeStarted(statisticsParams);
				break;

			case StatisticsType.CHALLENGE_COMPLETED:
				await this.handleChallengeCompleted(statisticsParams);
				break;

			case StatisticsType.CHALLENGE_FAILED:
				await this.handleChallengeFailed(statisticsParams);
				break;

			case StatisticsType.PURCHASE_MADE:
				await this.handlePurchaseMade(statisticsParams);
				break;

			default:
				this.logger.warn(`Unhandled statistics type: ${type}`);
				break;
		}
	}

	private async handleUserRegistered({
		date,
		platform,
	}: BaseStatisticsParams): Promise<void> {
		await this.prismaService.dailyStatistics.upsert({
			where: {
				date_platform: { date, platform },
			},
			update: {
				registeredCount: { increment: 1 },
			},
			create: {
				date,
				platform,
				registeredCount: 1,
			},
		});
	}

	private async handleAchievementUnlocked({
		date,
		platform,
	}: BaseStatisticsParams): Promise<void> {
		await this.prismaService.dailyStatistics.upsert({
			where: {
				date_platform: { date, platform },
			},
			update: {
				achievementsCount: { increment: 1 },
			},
			create: {
				date,
				platform,
				achievementsCount: 1,
			},
		});
	}

	private async handleChallengeStarted({
		date,
		platform,
	}: BaseStatisticsParams): Promise<void> {
		await this.prismaService.dailyStatistics.upsert({
			where: {
				date_platform: { date, platform },
			},
			update: {
				challengesStartedCount: { increment: 1 },
			},
			create: {
				date,
				platform,
				challengesStartedCount: 1,
			},
		});
	}

	private async handleChallengeCompleted({
		date,
		platform,
	}: BaseStatisticsParams): Promise<void> {
		await this.prismaService.dailyStatistics.upsert({
			where: {
				date_platform: { date, platform },
			},
			update: {
				challengesCompletedCount: { increment: 1 },
			},
			create: {
				date,
				platform,
				challengesCompletedCount: 1,
			},
		});
	}

	private async handleChallengeFailed({
		date,
		platform,
	}: BaseStatisticsParams): Promise<void> {
		await this.prismaService.dailyStatistics.upsert({
			where: {
				date_platform: { date, platform },
			},
			update: {
				challengesFailedCount: { increment: 1 },
			},
			create: {
				date,
				platform,
				challengesFailedCount: 1,
			},
		});
	}

	private async handlePurchaseMade({
		date,
		platform,
	}: BaseStatisticsParams): Promise<void> {
		await this.prismaService.dailyStatistics.upsert({
			where: {
				date_platform: { date, platform },
			},
			update: {
				purchasesCount: { increment: 1 },
			},
			create: {
				date,
				platform,
				purchasesCount: 1,
			},
		});
	}
}
