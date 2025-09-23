import { ChangePasswordDto } from '@/dto';
import { AuthField } from '@/types';

export const CHANGE_PASSWORD_FIELD: AuthField<ChangePasswordDto>[] = [
	{
		name: 'oldPassword',
		label: 'Enter your old password',
		type: 'password',
		placeholder: 'password',
		autocomplete: 'current-password',
	},
	{
		name: 'newPassword',
		label: 'Enter your new password',
		type: 'password',
		placeholder: 'password',
		autocomplete: 'new-password',
	},
];
