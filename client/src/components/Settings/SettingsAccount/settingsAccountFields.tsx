import { SettingsAccountDto } from '@/dto';
import { SettingsFormFields } from '@/types';

export const ACCOUNT_FIELDS: SettingsFormFields<SettingsAccountDto>[] = [
	{
		name: 'username',
		label: 'Username',
		type: 'text',
		placeholder: 'Username',
		autoComplete: 'username',
	},
];
