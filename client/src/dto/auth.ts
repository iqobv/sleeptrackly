import { LoginSchema, RegisterSchema } from '@/schemas';
import { z } from 'zod';

export type LoginDto = z.infer<typeof LoginSchema>;
export type RegisterDto = z.infer<typeof RegisterSchema>;
