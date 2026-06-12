import { SettingsAccountSchema } from '@/schemas/settings/settingsAccount.schema';
import { settingsPrivacySchema } from '@/schemas/settings/settingsPrivacy.schema';
import { SettingsSecuritySchema } from '@/schemas/settings/settingsSecurity.schema';
import z from 'zod';

export type SettingsAccountDto = z.infer<typeof SettingsAccountSchema>;
export type SettingsSecurityDto = z.infer<typeof SettingsSecuritySchema>;
export type SettingsPrivacyDto = z.infer<typeof settingsPrivacySchema>;
