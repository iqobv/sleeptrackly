import { z } from 'zod';
import {
	baseSleepEntrySchema,
	validateDateRange,
} from './baseSleepEntry.schema';

export const updateSleepEntryObject = baseSleepEntrySchema.partial().extend({
	isEdited: z.boolean().optional(),
});

export const updateSleepEntrySchema =
	updateSleepEntryObject.superRefine(validateDateRange);

export const updateSleepEntryFormSchema = updateSleepEntryObject
	.omit({
		dateForChart: true,
		isEdited: true,
	})
	.superRefine(validateDateRange);
