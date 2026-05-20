import { DefaultFields } from '../defaultFields.types';

export interface WeeklySummary extends Omit<DefaultFields, 'updatedAt'> {
	userId: string;
	year: number;
	weekNumber: number;
	weekStartDate: Date;
	weekEndDate: Date;
	totalSleepDuration: number;
	avgSleepDuration: number;
	minSleepDuration: number;
	minSleepDate: Date | null;
	maxSleepDuration: number;
	maxSleepDate: Date | null;
	avgBedtimeOffset: number;
	avgWakeTimeOffset: number;
	daysTracked: number;
	sleepScoreAvg: number;
	coinsEarned: number;
	achievementsUnlocked: number;
}
