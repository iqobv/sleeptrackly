import { LoginDto } from '@/dto';
import { AuthField } from '@/types';
import { MdOutlineEmail, MdOutlineVpnKey } from 'react-icons/md';

export const LOGIN_FIELDS: AuthField<LoginDto>[] = [
	{
		name: 'email',
		label: 'Enter your email',
		type: 'email',
		autocomplete: 'username',
		placeholder: 'email@example.com',
		icon: <MdOutlineEmail />,
	},
	{
		name: 'password',
		label: 'Enter your password',
		type: 'password',
		placeholder: 'Password',
		autocomplete: 'current-password',
		icon: <MdOutlineVpnKey />,
	},
];
