import { SettingsAccountSchema, SettingsSecuritySchema } from '@/schemas';
import z from 'zod';

export type SettingsAccountDto = z.infer<typeof SettingsAccountSchema>;
export type SettingsSecurityDto = z.infer<typeof SettingsSecuritySchema>;
