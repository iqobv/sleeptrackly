'use client';

import { getUserPrivacySettings, updatePrivacySettings } from '@/api';
import { QUERY_KEYS } from '@/config';
import { SettingsPrivacyDto } from '@/dto';
import { PrivacySettings } from '@/types';
import { useQuery } from '@tanstack/react-query';
import SettingsForm from '../SettingsForm/SettingsForm';
import { SETTINGS_PRIVACY_FIELDS } from './settingsPrivacyFields';

const SettingsPrivacy = () => {
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

export default SettingsPrivacy;
