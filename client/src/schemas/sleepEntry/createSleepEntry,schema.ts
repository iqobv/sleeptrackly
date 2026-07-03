import {
	baseSleepEntrySchema,
	validateDateRange,
} from './baseSleepEntry.schema';

export const createSleepEntryObject = baseSleepEntrySchema;

export const createSleepEntrySchema =
	createSleepEntryObject.superRefine(validateDateRange);

export const createSleepEntryFormSchema = createSleepEntryObject
	.omit({
		dateForChart: true,
	})
	.superRefine(validateDateRange);
