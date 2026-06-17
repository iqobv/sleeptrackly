import { SleepEntry } from '@generated/prisma/client';

export interface WeeklyStatistics {
	totalSleepDuration: number;
	avgSleepDuration: number;
	coinsEarned: number;
	daysTracked: number;
	achievementsUnlocked: number;
	avgRating: number;
	avgBedtimeOffset: number;
	avgWakeTimeOffset: number;
	minSleep: SleepEntry;
	maxSleep: SleepEntry;
}
