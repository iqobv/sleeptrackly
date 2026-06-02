import { PrismaService } from '@infra/prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { WeeklySummaryService } from './weekly-summary.service';

dayjs.extend(isoWeek);

@Injectable()
export class WeeklySummaryCronService {
	private readonly logger = new Logger(WeeklySummaryCronService.name);

	constructor(
		private readonly prismaService: PrismaService,
		private readonly weeklySummaryService: WeeklySummaryService,
	) {}

	@Cron('5 3 * * 3')
	private async generateWeeklySummariesForAllUsers(): Promise<void> {
		const todayString = dayjs().format('YYYY-MM-DD');
		const previousWeek = dayjs().subtract(1, 'week');
		const prevYear = previousWeek.isoWeekYear();
		const prevWeekNumber = previousWeek.isoWeek();

		const startDateString = previousWeek
			.startOf('isoWeek')
			.format('YYYY-MM-DD');
		const endDateString = previousWeek.endOf('isoWeek').format('YYYY-MM-DD');

		const usersWithEntries = await this.prismaService.sleepEntry.findMany({
			where: {
				dateForChart: {
					gte: startDateString,
					lte: endDateString,
				},
			},
			select: { userId: true },
			distinct: ['userId'],
		});

		if (usersWithEntries.length === 0) return;

		const usersWithSummaries =
			await this.prismaService.weeklySleepSummary.findMany({
				where: {
					year: prevYear,
					weekNumber: prevWeekNumber,
				},
				select: { userId: true },
			});

		const summarizedUserIds = new Set(
			usersWithSummaries.map((user) => user.userId),
		);

		const ghostUsers = usersWithEntries.filter(
			(user) => !summarizedUserIds.has(user.userId),
		);

		if (ghostUsers.length === 0) return;

		let successCount = 0;
		for (const ghostUser of ghostUsers) {
			try {
				await this.weeklySummaryService.generateSummaryForPreviousWeek(
					ghostUser.userId,
					todayString,
				);
				successCount++;
			} catch (error: unknown) {
				this.logger.error(
					`Failed to generate missing summary for user ${ghostUser.userId}`,
					error instanceof Error ? error.stack : 'Unknown error',
				);
			}
		}

		this.logger.log(
			`Weekly summary cron completed. Generated ${successCount} summaries for week ${prevYear}-W${prevWeekNumber}.`,
		);
	}
}
