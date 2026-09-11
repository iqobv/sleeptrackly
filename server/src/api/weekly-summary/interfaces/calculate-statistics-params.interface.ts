import { SleepEntry } from '@generated/prisma/client';

export interface CalculateStatisticsParams {
	userId: string;
	sleepRecords: SleepEntry[];
	startDate: Date;
	endDate: Date;
}
