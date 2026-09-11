import { LoginSchema } from '@/schemas/auth/login.schema';
import { RegisterSchema } from '@/schemas/auth/register.schema';
import { z } from 'zod';

export type LoginDto = z.infer<typeof LoginSchema>;
export type RegisterDto = z.infer<typeof RegisterSchema>;
