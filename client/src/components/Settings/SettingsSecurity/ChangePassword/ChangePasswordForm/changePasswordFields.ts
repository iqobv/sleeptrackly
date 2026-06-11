import { ChangePasswordDto } from '@/dto/auth/password.dto';
import { AuthField } from '@/types/auth/authField.types';

export const CHANGE_PASSWORD_FIELD: AuthField<ChangePasswordDto>[] = [
	{
		name: 'oldPassword',
		label: 'Enter your old password',
		type: 'password',
		placeholder: 'password',
		autoComplete: 'current-password',
	},
	{
		name: 'newPassword',
		label: 'Enter your new password',
		type: 'password',
		placeholder: 'password',
		autoComplete: 'new-password',
	},
];
