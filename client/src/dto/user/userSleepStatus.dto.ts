import { userSleepStatusSchema } from '@/schemas/user/userSleepStatus.schema';
import z from 'zod';

export type UserSleepStatusDto = z.infer<typeof userSleepStatusSchema>;
