import { SettingsSchema } from '@/schemas';
import z from 'zod';

export type SettingsDto = z.infer<typeof SettingsSchema>;
