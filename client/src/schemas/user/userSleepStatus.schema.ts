import { validateDateRange } from '../sleepEntry/baseSleepEntry.schema';
import { updateSleepEntryObject } from '../sleepEntry/updateSleepEntry.schema';

export const userSleepStatusSchema = updateSleepEntryObject
	.required({
		dateForChart: true,
		sleepEnd: true,
		rating: true,
	})
	.superRefine(validateDateRange);
