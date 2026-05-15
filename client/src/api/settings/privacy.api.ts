import { SettingsPrivacyDto } from '@/dto';
import { PrivacySettings } from '@/types';
import { apiClient } from '../axios';

export const updatePrivacySettings = async (dto: SettingsPrivacyDto) =>
	(await apiClient.patch<PrivacySettings>('/v1/user-privacy-settings/me', dto))
		.data;

export const getUserPrivacySettings = async () =>
	(await apiClient.get<PrivacySettings>('/v1/user-privacy-settings/me')).data;
