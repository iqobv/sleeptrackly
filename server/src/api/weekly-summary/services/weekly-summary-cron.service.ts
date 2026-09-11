import { PrismaService } from '@infra/prisma/prisma.service';
import { DATE_FORMAT } from '@libs/constants/date-format.constants';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { WeeklySummaryService } from './weekly-summary.service';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isoWeek);

@Injectable()
export class WeeklySummaryCronService {
	private readonly logger = new Logger(WeeklySummaryCronService.name);
	private readonly BATCH_SIZE = 50;

	constructor(
		private readonly prismaService: PrismaService,
		private readonly weeklySummaryService: WeeklySummaryService,
	) {}

	@Cron(CronExpression.EVERY_HOUR)
	public async generateWeeklySummariesForAllUsers(): Promise<void> {
		const TARGET_HOUR = 3;

		const uniqueTimezones = await this.prismaService.user.findMany({
			select: { timezone: true },
			distinct: ['timezone'],
		});

		const targetTimezones = uniqueTimezones
			.map((t) => t.timezone)
			.filter((tz) => {
				try {
					const localTime = dayjs().tz(tz);
					return localTime.hour() === TARGET_HOUR && localTime.day() === 1;
				} catch {
					return false;
				}
			});

		if (targetTimezones.length === 0) return;

		const users = await this.prismaService.user.findMany({
			where: {
				timezone: { in: targetTimezones },
			},
			select: { id: true, timezone: true },
		});

		if (users.length === 0) return;

		let successCount = 0;

		for (let i = 0; i < users.length; i += this.BATCH_SIZE) {
			const batch = users.slice(i, i + this.BATCH_SIZE);

			const batchPromises = batch.map(async (user) => {
				try {
					const localTime = dayjs().tz(user.timezone);
					const currentDateForChart = localTime.format(DATE_FORMAT);

					await this.weeklySummaryService.generateSummaryForPreviousWeek(
						user.id,
						currentDateForChart,
					);
					return true;
				} catch (error: unknown) {
					this.logger.error(
						`Failed to generate missing summary for user ${user.id}`,
						error instanceof Error ? error.stack : 'Unknown error',
					);
					return false;
				}
			});

			const results = await Promise.all(batchPromises);
			successCount += results.filter(Boolean).length;
		}

		this.logger.log(
			`Weekly summary cron completed. Generated ${successCount} summaries for timezones: ${targetTimezones.join(', ')}`,
		);
	}
}
