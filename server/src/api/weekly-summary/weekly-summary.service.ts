import { NotificationService } from '@api/notification/notification.service';
import { NotificationType } from '@generated/prisma/enums';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { Injectable, NotFoundException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { plainToInstance } from 'class-transformer';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import utc from 'dayjs/plugin/utc';
import { WeeklySummaryDto } from './dto/weekly-summary.dto';
import { SLEEP_ENDED_EVENT, SleepEndedEvent } from './events/sleep-ended.event';

dayjs.extend(utc);
dayjs.extend(isoWeek);

@Injectable()
export class WeeklySummaryService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly notificationService: NotificationService,
	) {}

	@OnEvent(SLEEP_ENDED_EVENT, { async: true })
	public async handleSleepEndedEvent(payload: SleepEndedEvent): Promise<void> {
		const { dateForChart, userId } = payload;

		const currentChartDay = dayjs(dateForChart, 'YYYY-MM-DD');
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

	public async generateSummaryForPreviousWeek(
		userId: string,
		currentDateForChart: string,
	): Promise<WeeklySummaryDto | null> {
		const previousWeek = dayjs(currentDateForChart, 'YYYY-MM-DD').subtract(
			1,
			'week',
		);
		const year = previousWeek.isoWeekYear();
		const week = previousWeek.isoWeek();

		const startDateString = previousWeek
			.startOf('isoWeek')
			.format('YYYY-MM-DD');
		const endDateString = previousWeek.endOf('isoWeek').format('YYYY-MM-DD');

		const weekStartDate = dayjs.utc(startDateString, 'YYYY-MM-DD').toDate();
		const weekEndDate = dayjs
			.utc(endDateString, 'YYYY-MM-DD')
			.endOf('day')
			.toDate();

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

			const minSleep = sortedByDuration[0];
			const maxSleep = sortedByDuration[sortedByDuration.length - 1];

			const transactionRecords = await tx.coinTransaction.findMany({
				where: {
					userId,
					type: 'SLEEP_REWARD',
					referenceId: { in: sleepRecords.map((record) => record.id) },
				},
			});

			const coinsEarned = transactionRecords.reduce(
				(acc, curr) => acc + curr.amount,
				0,
			);

			const summary = await tx.weeklySleepSummary.create({
				data: {
					userId,
					year,
					weekNumber: week,
					weekEndDate,
					weekStartDate,
					totalSleepDuration,
					avgSleepDuration,
					minSleepDuration: minSleep.sleepDuration,
					minSleepDate: minSleep.sleepEnd,
					maxSleepDuration: maxSleep.sleepDuration,
					maxSleepDate: maxSleep.sleepEnd,
					avgBedtimeOffset: this.calculateAvgBedtimeOffset(
						sleepRecords.map((r) => r.sleepStart),
					),
					avgWakeTimeOffset: this.calculateAvgWakeTimeOffset(
						sleepRecords.map((r) => r.sleepEnd),
					),
					daysTracked: sleepRecords.length,
					coinsEarned,
				},
			});

			await this.notificationService.create(
				{
					userId,
					weeklySleepSummaryId: summary.id,
					title: 'Your Weekly Sleep Summary is here!',
					body: 'Check out how you slept last week! Tap to view your personalized insights.',
					type: NotificationType.WEEKLY_SUMMARY,
				},
				tx,
			);

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
