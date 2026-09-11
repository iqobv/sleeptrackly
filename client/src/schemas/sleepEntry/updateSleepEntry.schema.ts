import {
	baseSleepEntrySchema,
	validateDateRange,
} from './baseSleepEntry.schema';

export const updateSleepEntryObject = baseSleepEntrySchema.partial().required({
	timezone: true,
});

export const updateSleepEntrySchema =
	updateSleepEntryObject.superRefine(validateDateRange);

export const updateSleepEntryFormSchema = updateSleepEntryObject
	.omit({
		dateForChart: true,
		timezone: true,
	})
	.superRefine(validateDateRange);
