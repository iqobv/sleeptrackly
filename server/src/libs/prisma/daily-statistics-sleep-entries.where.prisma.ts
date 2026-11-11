import { Prisma } from '@generated/prisma/client';

export const sleepEntryWhere = (
	startDate: string,
	endDate: string,
): Prisma.SleepEntryWhereInput => ({
	isVerified: true,
	dateForChart: {
		gte: startDate,
		lte: endDate,
	},
});
