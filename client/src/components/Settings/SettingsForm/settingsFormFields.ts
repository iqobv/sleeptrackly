import { SettingsDto } from '@/dto';
import { SettingsFormFields } from '@/types';

export const SETTINGS_FIELDS: SettingsFormFields<SettingsDto>[] = [
	{
		name: 'email',
		label: 'Email',
		type: 'email',
		placeholder: 'email@example.com',
		autocomplete: 'email',
	},
	{
		name: 'username',
		label: 'Username',
		type: 'text',
		placeholder: 'Username',
		autocomplete: 'username',
	},
];
