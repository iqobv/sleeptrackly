import { Select, ToggleSwitch } from '@/components/UI';
import { PRIVACY_VISIBILITY } from '@/constants';
import { SettingsPrivacyDto } from '@/dto';
import { Option, SettingsFormFields } from '@/types';
import { Controller, Path } from 'react-hook-form';

const OPTIONS: Option[] = [
	{
		value: PRIVACY_VISIBILITY.PUBLIC,
		label: 'Public',
	},
	{
		value: PRIVACY_VISIBILITY.FRIENDS,
		label: 'Friends',
	},
	{
		value: PRIVACY_VISIBILITY.PRIVATE,
		label: 'Private',
	},
];

export const SETTINGS_PRIVACY_FIELDS: SettingsFormFields<SettingsPrivacyDto>[] =
	[
		{
			name: 'acceptFriendRequests',
			label: 'Accept Friend Requests',
			placeholder: 'Accept Friend Requests',
			type: 'checkbox',
			mobileDirection: 'row',
			render: ({ name, methods: { register } }) => (
				<ToggleSwitch {...register(name)} />
			),
		},
		{
			name: 'showActivity',
			label: 'Show Activity',
			placeholder: 'Show Activity',
			type: 'checkbox',
			mobileDirection: 'row',
			render: ({ name, methods: { register } }) => (
				<ToggleSwitch {...register(name)} />
			),
		},
		{
			name: 'profileVisibility',
			label: 'Profile Visibility',
			placeholder: 'Profile Visibility',
			type: 'text',
			render: ({ name, methods }) => (
				<Controller
					control={methods.control}
					name={name as Path<SettingsPrivacyDto>}
					render={({ field: { onChange, value }, fieldState: { error } }) => (
						<Select
							options={OPTIONS}
							value={value as string}
							onChange={onChange}
							error={error?.message}
						/>
					)}
				/>
			),
		},
		{
			name: 'statisticsVisibility',
			label: 'Statistics Visibility',
			placeholder: 'Statistics Visibility',
			type: 'text',
			render: ({ name, methods }) => (
				<Controller
					control={methods.control}
					name={name as Path<SettingsPrivacyDto>}
					render={({ field: { onChange, value }, fieldState: { error } }) => (
						<Select
							options={OPTIONS}
							value={value as string}
							onChange={onChange}
							error={error?.message}
						/>
					)}
				/>
			),
		},
	];
