import { SettingsAccountDto } from '@/dto';
import { SettingsFormFields } from '@/types';

export const ACCOUNT_FIELDS: SettingsFormFields<SettingsAccountDto>[] = [
	// {
	// 	name: 'email',
	// 	label: 'Email',
	// 	type: 'email',
	// 	placeholder: 'email@example.com',
	// 	autocomplete: 'email',
	// },
	{
		name: 'username',
		label: 'Username',
		type: 'text',
		placeholder: 'Username',
		autocomplete: 'username',
	},
];
