import { changePasswordSchema, emailSchema, passwordSchema } from '@/schemas';
import z from 'zod';

export type EmailDto = z.infer<typeof emailSchema>;
export type PassordDto = z.infer<typeof passwordSchema>;
export type ChangePasswordDto = z.infer<typeof changePasswordSchema>;
