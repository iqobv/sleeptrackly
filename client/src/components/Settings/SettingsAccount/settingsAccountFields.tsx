import { SettingsAccountDto } from '@/dto/settings/settings.dto';
import { SettingsFormFields } from '@/types/settings/settingsField.types';

export const ACCOUNT_FIELDS: SettingsFormFields<SettingsAccountDto>[] = [
	{
		name: 'username',
		label: 'Username',
		type: 'text',
		placeholder: 'Username',
		autoComplete: 'username',
	},
];
