import { LoginSchema, RegisterSchema } from '@/schemas';
import { z } from 'zod';

export interface LoginDto extends z.infer<typeof LoginSchema> {}

export interface RegisterDto extends z.infer<typeof RegisterSchema> {}
