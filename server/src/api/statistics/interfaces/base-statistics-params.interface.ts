import { Platform } from '@generated/prisma/enums';

export interface BaseStatisticsParams {
	date: string;
	platform: Platform;
}
