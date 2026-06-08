import { FormSelect } from '@/components/UI';
import { SettingsPrivacyDto } from '@/dto';
import { Option, PrivacyVisibility, SettingsFormFields } from '@/types';
import { SelectItem, ToggleSwitch } from '@shared/ui';
import { Control, Path } from 'react-hook-form';

interface SettingsPrivacyFieldsProps {
	name: Path<SettingsPrivacyDto>;
	control: Control<SettingsPrivacyDto>;
}

const OPTIONS: Option[] = [
	{
		value: PrivacyVisibility.PUBLIC,
		label: 'Public',
	},
	{
		value: PrivacyVisibility.FRIENDS,
		label: 'Friends',
	},
	{
		value: PrivacyVisibility.PRIVATE,
		label: 'Private',
	},
];

const PrivacySelectField = ({ control, name }: SettingsPrivacyFieldsProps) => (
	<FormSelect name={name} control={control}>
		{OPTIONS.map((option) => (
			<SelectItem key={option.value} value={option.value}>
				{option.label}
			</SelectItem>
		))}
	</FormSelect>
);

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
				<PrivacySelectField name={name} control={methods.control} />
			),
		},
		{
			name: 'achievementsVisibility',
			label: 'Achievement Visibility',
			placeholder: 'Achievement Visibility',
			type: 'text',
			render: ({ name, methods }) => (
				<PrivacySelectField name={name} control={methods.control} />
			),
		},
		{
			name: 'statisticsVisibility',
			label: 'Statistics Visibility',
			placeholder: 'Statistics Visibility',
			type: 'text',
			render: ({ name, methods }) => (
				<PrivacySelectField name={name} control={methods.control} />
			),
		},
	];
