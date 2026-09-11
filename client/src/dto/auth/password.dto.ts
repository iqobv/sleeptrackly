import { emailSchema, passwordSchema } from '@/schemas/auth/baseAuth.schema';
import { changePasswordSchema } from '@/schemas/auth/changePassword.schema';
import { z } from 'zod';

export type EmailDto = z.infer<typeof emailSchema>;
export type PassordDto = z.infer<typeof passwordSchema>;
export type ChangePasswordDto = z.infer<typeof changePasswordSchema>;
