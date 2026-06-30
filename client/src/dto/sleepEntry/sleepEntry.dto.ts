import { updateSleepEntrySchema } from '@/schemas/sleepEntry/updateSleepEntry.schema';
import { z } from 'zod';

export type UpdateSleepEntryDto = z.infer<typeof updateSleepEntrySchema>;
