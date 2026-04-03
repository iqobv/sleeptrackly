import { SettingsPrivacyDto } from '@/dto';
import { IPrivacySettings } from '@/types';
import { fetcher } from '@/utils';

export const updatePrivacySettings = async (dto: SettingsPrivacyDto) =>
	await fetcher<IPrivacySettings>('/api/v1/user-privacy-settings/me', {
		method: 'PATCH',
		body: JSON.stringify(dto),
	});

export const getUserPrivacySettings = async () =>
	await fetcher<IPrivacySettings>('/api/v1/user-privacy-settings/me');
