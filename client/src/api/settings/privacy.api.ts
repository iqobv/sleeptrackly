import { SettingsPrivacyDto } from '@/dto/settings/settings.dto';
import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type GetUserPrivacySettingsResponse =
	paths['/v1/user-privacy-settings/me']['get']['responses']['200']['content']['application/json'];
type UpdateUserPrivacySettingsResponse =
	paths['/v1/user-privacy-settings/me']['patch']['responses']['200']['content']['application/json'];

export const updatePrivacySettings = async (dto: SettingsPrivacyDto) =>
	(
		await apiClient.patch<GetUserPrivacySettingsResponse>(
			'/v1/user-privacy-settings/me',
			dto,
		)
	).data;

export const getUserPrivacySettings = async () =>
	(
		await apiClient.get<UpdateUserPrivacySettingsResponse>(
			'/v1/user-privacy-settings/me',
		)
	).data;
