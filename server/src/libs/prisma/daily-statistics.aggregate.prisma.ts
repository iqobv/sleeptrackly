import { Prisma } from '@generated/prisma/client';

export const dailyStatisticsAggregate = (
	startDate: string,
	endDate: string,
): Prisma.DailyStatisticsAggregateArgs => ({
	_sum: {
		achievementsCount: true,
		challengesCompletedCount: true,
		challengesFailedCount: true,
		challengesStartedCount: true,
		purchasesCount: true,
		registeredCount: true,
	},
	where: {
		date: {
			gte: startDate,
			lte: endDate,
		},
	},
});
