import { Platform, Prisma } from '@generated/prisma/client';

export const dailyStatisticsAggregate = (
	startDate: string,
	endDate: string,
	platform?: Platform,
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
		...(platform && { platform }),
	},
});
