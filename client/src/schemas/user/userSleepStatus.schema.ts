import { z } from 'zod';
import {
	updateSleepEntrySchema,
	validateDateRange,
} from '../sleepEntry/updateSleepEntry.schema';

export const userSleepStatusSchema = updateSleepEntrySchema
	.extend({
		rating: updateSleepEntrySchema.shape.rating.optional(),
		dateForChart: z.string().optional(),
	})
	.superRefine((data, ctx) => validateDateRange(data, ctx));
