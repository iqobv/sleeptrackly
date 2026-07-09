import { syncTimezoneSchema } from '@/schemas/user/syncTimezone.schema';
import { z } from 'zod';

export type SyncTimezoneDto = z.infer<typeof syncTimezoneSchema>;
