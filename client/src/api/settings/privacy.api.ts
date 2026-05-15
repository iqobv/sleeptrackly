import { SettingsPrivacyDto } from '@/dto';
import { IPrivacySettings } from '@/types';
import { apiClient } from '../axios';

export const updatePrivacySettings = async (dto: SettingsPrivacyDto) =>
	(await apiClient.patch<IPrivacySettings>('/v1/user-privacy-settings/me', dto))
		.data;

export const getUserPrivacySettings = async () =>
	(await apiClient.get<IPrivacySettings>('/v1/user-privacy-settings/me')).data;
