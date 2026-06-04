import { getUserPrivacySettings } from '@/api';

export type PrivacySettings = Awaited<
	ReturnType<typeof getUserPrivacySettings>
>;
