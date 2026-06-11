import { getUserPrivacySettings } from '@/api/settings/privacy.api';

export type PrivacySettings = Awaited<
	ReturnType<typeof getUserPrivacySettings>
>;
