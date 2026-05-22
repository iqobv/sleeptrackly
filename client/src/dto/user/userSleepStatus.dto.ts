import { userSleepStatusSchema } from '@/schemas';
import z from 'zod';

export type UserSleepStatusDto = z.infer<typeof userSleepStatusSchema>;
