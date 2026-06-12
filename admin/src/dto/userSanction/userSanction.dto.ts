import { userSanctionSchema } from '@/schemas/userSanction/userSanction.schema';
import z from 'zod';

export type UserSanctionDto = z.infer<typeof userSanctionSchema>;
