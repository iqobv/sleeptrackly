import { NotificationService } from '@api/notification/notification.service';
import { Prisma } from '@generated/prisma/client';
import { NotificationType } from '@generated/prisma/enums';
import { PrismaService } from '@infra/prisma/prisma.service';
import { DATE_FORMAT } from '@libs/constants/date-format.constants';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { Injectable, NotFoundException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { plainToInstance } from 'class-transformer';
import dayjs, { Dayjs } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import utc from 'dayjs/plugin/utc';
import { WeeklySummaryDto } from './dto/weekly-summary.dto';
import {
	SLEEP_RECORDED_EVENT,
	SleepRecordedEvent,
} from './events/sleep-ended.event';
import { CalculateStatisticsParams } from './interfaces/calculate-statistics-params.interface';
import { Dates } from './interfaces/dates.interface';
import { WeeklyStatistics } from './interfaces/weekly-statistics.interface';

dayjs.extend(utc);
dayjs.extend(isoWeek);

@Injectable()
export class WeeklySummaryService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly notificationService: NotificationService,
	) {}

	@OnEvent(SLEEP_RECORDED_EVENT, { async: true })
	public async handleSleepEndedEvent(
		payload: SleepRecordedEvent,
	): Promise<void> {
		const { dateForChart, userId, isManual } = payload;

		if (isManual) {
			await this.recalculateSummaryForWeek(userId, dateForChart);
		} else {
			const currentChartDay = dayjs(dateForChart, DATE_FORMAT);
			const previousWeek = currentChartDay.subtract(1, 'week');

			const year = previousWeek.isoWeekYear();
			const week = previousWeek.isoWeek();

			const existingSummary =
				await this.prismaService.weeklySleepSummary.findUnique({
					where: {
						userId_year_weekNumber: {
							userId,
							year,
							weekNumber: week,
						},
					},
				});

			if (!existingSummary)
				await this.generateSummaryForPreviousWeek(userId, dateForChart);
		}
	}

	public async recalculateSummaryForWeek(userId: string, dateForChart: string) {
		const targetDate = dayjs(dateForChart, DATE_FORMAT);

		const {
			week,
			year,
			startDateString,
			endDateString,
			weekStartDate,
			weekEndDate,
		} = this.getDates(targetDate);

		return await this.prismaService.$transaction(async (tx) => {
			const sleepRecords = await tx.sleepEntry.findMany({
				where: {
					userId,
					dateForChart: { gte: startDateString, lte: endDateString },
				},
			});

			if (sleepRecords.length === 0) {
				await tx.weeklySleepSummary.deleteMany({
					where: { userId, year, weekNumber: week },
				});

				return null;
			}

			const { maxSleep, minSleep, ...rest } = await this.calculateStatistics(
				{
					userId,
					sleepRecords,
					startDate: weekStartDate,
					endDate: weekEndDate,
				},
				tx,
			);

			const data = {
				weekEndDate,
				weekStartDate,
				minSleepDuration: minSleep.sleepDuration,
				minSleepDate: minSleep.sleepEnd,
				maxSleepDuration: maxSleep.sleepDuration,
				maxSleepDate: maxSleep.sleepEnd,
				sleepScoreAvg: 0,
				...rest,
			} satisfies Prisma.WeeklySleepSummaryUpdateInput;

			const summary = await tx.weeklySleepSummary.upsert({
				where: {
					userId_year_weekNumber: {
						userId,
						year,
						weekNumber: week,
					},
				},
				update: {
					...data,
				},
				create: {
					userId,
					weekNumber: week,
					year,
					...data,
				},
			});

			return plainToInstance(WeeklySummaryDto, summary);
		});
	}

	public async generateSummaryForPreviousWeek(
		userId: string,
		currentDateForChart: string,
	): Promise<WeeklySummaryDto | null> {
		const previousWeek = dayjs(currentDateForChart, DATE_FORMAT).subtract(
			1,
			'week',
		);

		const {
			week,
			year,
			startDateString,
			endDateString,
			weekStartDate,
			weekEndDate,
		} = this.getDates(previousWeek);

		return await this.prismaService.$transaction(async (tx) => {
			const existingSummary = await tx.weeklySleepSummary.findUnique({
				where: {
					userId_year_weekNumber: {
						userId,
						year,
						weekNumber: week,
					},
				},
			});

			if (existingSummary) return null;

			const sleepRecords = await tx.sleepEntry.findMany({
				where: {
					userId,
					dateForChart: {
						gte: startDateString,
						lte: endDateString,
					},
				},
			});

			if (sleepRecords.length === 0) {
				return await tx.weeklySleepSummary.create({
					data: {
						userId,
						year,
						weekNumber: week,
						weekEndDate,
						weekStartDate,
					},
				});
			}

			const { maxSleep, minSleep, ...rest } = await this.calculateStatistics(
				{
					userId,
					sleepRecords,
					startDate: weekStartDate,
					endDate: weekEndDate,
				},
				tx,
			);

			const summary = await tx.weeklySleepSummary.create({
				data: {
					userId,
					year,
					weekNumber: week,
					weekEndDate,
					weekStartDate,
					minSleepDuration: minSleep.sleepDuration,
					minSleepDate: minSleep.sleepEnd,
					maxSleepDuration: maxSleep.sleepDuration,
					maxSleepDate: maxSleep.sleepEnd,
					...rest,
				},
			});

			await this.notificationService.create({
				userId,
				weeklySleepSummaryId: summary.id,
				title: 'Your Weekly Sleep Summary is here!',
				body: 'Check out how you slept last week! Tap to view your personalized insights.',
				type: NotificationType.WEEKLY_SUMMARY,
			});

			return plainToInstance(WeeklySummaryDto, summary);
		});
	}

	public async getSummaryById(
		userId: string,
		summaryId: string,
	): Promise<WeeklySummaryDto> {
		const summary = await this.prismaService.weeklySleepSummary.findFirst({
			where: { id: summaryId, userId },
		});

		if (!summary)
			throw new NotFoundException(ERROR_MESSAGES.WEEKLY_SUMMARY.NOT_FOUND);

		return plainToInstance(WeeklySummaryDto, summary);
	}

	private getDates(date: Dayjs): Dates {
		const year = date.isoWeekYear();
		const week = date.isoWeek();

		const startDateString = date.startOf('isoWeek').format(DATE_FORMAT);
		const endDateString = date.endOf('isoWeek').format(DATE_FORMAT);

		const weekStartDate = dayjs.utc(startDateString, DATE_FORMAT).toDate();
		const weekEndDate = dayjs
			.utc(endDateString, DATE_FORMAT)
			.endOf('day')
			.toDate();

		return {
			year,
			week,
			startDateString,
			endDateString,
			weekStartDate,
			weekEndDate,
		};
	}

	private async calculateStatistics(
		params: CalculateStatisticsParams,
		tx: Prisma.TransactionClient,
	): Promise<WeeklyStatistics> {
		const { sleepRecords, userId, startDate, endDate } = params;

		const totalSleepDuration = sleepRecords.reduce(
			(acc, curr) => acc + curr.sleepDuration,
			0,
		);

		const avgSleepDuration = Math.round(
			totalSleepDuration / sleepRecords.length,
		);

		const sortedByDuration = [...sleepRecords].sort(
			(a, b) => a.sleepDuration - b.sleepDuration,
		);

		const avgRating = Math.round(
			sleepRecords.reduce((acc, curr) => acc + curr.rating, 0) /
				sleepRecords.length,
		);

		const minSleep = sortedByDuration[0];
		const maxSleep = sortedByDuration[sortedByDuration.length - 1];

		const daysTracked = new Set(
			sleepRecords.map((record) => record.dateForChart),
		).size;

		const transactionRecords = await tx.coinTransaction.findMany({
			where: {
				userId,
				type: { in: ['SLEEP_REWARD', 'ACHIEVEMENT'] },
				createdAt: { gte: startDate, lte: endDate },
			},
		});

		const achievementsEarned = await tx.userAchievement.findMany({
			where: {
				userId,
				achievedAt: { gte: startDate, lte: endDate },
			},
		});

		const coinsEarned = transactionRecords.reduce(
			(acc, curr) => acc + curr.amount,
			0,
		);

		const achievementsUnlocked = achievementsEarned.length;

		return {
			totalSleepDuration,
			avgSleepDuration,
			coinsEarned,
			daysTracked,
			achievementsUnlocked,
			avgRating,
			avgBedtimeOffset: this.calculateAvgBedtimeOffset(
				sleepRecords.map((r) => r.sleepStart),
			),
			avgWakeTimeOffset: this.calculateAvgWakeTimeOffset(
				sleepRecords.map((r) => r.sleepEnd),
			),
			minSleep,
			maxSleep,
		};
	}

	private calculateAvgBedtimeOffset(dates: Date[]): number {
		if (dates.length === 0) return 0;

		const totalMinutes = dates.reduce((sum, date) => {
			const d = dayjs(date).utc();
			const absoluteMinutes = d.hour() * 60 + d.minute();
			const adjustedMinutes =
				absoluteMinutes < 720 ? absoluteMinutes + 1440 : absoluteMinutes;

			return sum + adjustedMinutes;
		}, 0);

		const averageMinutes = Math.round(totalMinutes / dates.length);

		return averageMinutes >= 1440 ? averageMinutes - 1440 : averageMinutes;
	}

	private calculateAvgWakeTimeOffset(dates: Date[]): number {
		if (dates.length === 0) return 0;

		const totalMinutes = dates.reduce((sum, date) => {
			const d = dayjs(date).utc();
			return sum + (d.hour() * 60 + d.minute());
		}, 0);

		return Math.round(totalMinutes / dates.length);
	}
}
