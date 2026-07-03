import {
	createSleepEntryFormSchema,
	createSleepEntrySchema,
} from '@/schemas/sleepEntry/createSleepEntry,schema';
import { updateSleepEntrySchema } from '@/schemas/sleepEntry/updateSleepEntry.schema';
import { z } from 'zod';

export type UpdateSleepEntryDto = z.infer<typeof updateSleepEntrySchema>;
export type CreateSleepEntryDto = z.infer<typeof createSleepEntrySchema>;
export type CreateSleepEntryFormDto = z.infer<
	typeof createSleepEntryFormSchema
>;
