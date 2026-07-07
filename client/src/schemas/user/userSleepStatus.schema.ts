import { validateDateRange } from '../sleepEntry/baseSleepEntry.schema';
import { updateSleepEntryObject } from '../sleepEntry/updateSleepEntry.schema';

export const userSleepStatusSchema =
	updateSleepEntryObject.superRefine(validateDateRange);
