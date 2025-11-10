import { userSanctionSchema } from '@/schemas';
import z from 'zod';

export type UserSanctionDto = z.infer<typeof userSanctionSchema>;
