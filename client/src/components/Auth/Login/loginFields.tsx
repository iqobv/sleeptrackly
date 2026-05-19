import { LoginDto } from '@/dto';
import { AuthField } from '@/types';
import { MdOutlineEmail, MdOutlineVpnKey } from 'react-icons/md';

export const LOGIN_FIELDS: AuthField<LoginDto>[] = [
	{
		name: 'email',
		label: 'Enter your email',
		type: 'email',
		autoComplete: 'username',
		placeholder: 'email@example.com',
		icon: <MdOutlineEmail />,
	},
	{
		name: 'password',
		label: 'Enter your password',
		type: 'password',
		placeholder: 'Password',
		autoComplete: 'current-password',
		icon: <MdOutlineVpnKey />,
	},
];
