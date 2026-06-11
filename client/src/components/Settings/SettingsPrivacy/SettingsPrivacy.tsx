'use client';

import {
	getUserPrivacySettings,
	updatePrivacySettings,
} from '@/api/settings/privacy.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { SettingsPrivacyDto } from '@/dto/settings/settings.dto';
import { PrivacySettings } from '@/types/settings/privacySettings.types';
import { useQuery } from '@tanstack/react-query';
import { SettingsForm } from '../SettingsForm/SettingsForm';
import { SETTINGS_PRIVACY_FIELDS } from './settingsPrivacyFields';

export const SettingsPrivacy = () => {
	const { data, refetch } = useQuery({
		queryKey: QUERY_KEYS.privacy.get,
		queryFn: getUserPrivacySettings,
	});

	return (
		<div>
			{data && (
				<SettingsForm<SettingsPrivacyDto, PrivacySettings>
					fields={SETTINGS_PRIVACY_FIELDS}
					mutationFn={(dto) => updatePrivacySettings(dto)}
					defaultValues={{
						...data,
					}}
					onSuccess={() => refetch()}
				/>
			)}
		</div>
	);
};
