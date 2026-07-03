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
