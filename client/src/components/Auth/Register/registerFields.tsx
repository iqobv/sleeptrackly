import { RegisterDto } from '@/dto';
import { AuthField } from '@/types';
import {
	MdOutlineEmail,
	MdOutlineVpnKey,
	MdPersonOutline,
} from 'react-icons/md';

export const REGISTER_FIELDS: AuthField<RegisterDto>[] = [
	{
		name: 'email',
		label: 'Enter your email',
		type: 'email',
		placeholder: 'email@example.com',
		autocomplete: 'username',
		icon: <MdOutlineEmail />,
	},
	{
		name: 'password',
		label: 'Create a password',
		type: 'password',
		placeholder: 'Password',
		autocomplete: 'new-password',
		icon: <MdOutlineVpnKey />,
	},
	{
		name: 'username',
		label: 'Create a username',
		type: 'text',
		placeholder: 'Username',
		autocomplete: 'on',
		icon: <MdPersonOutline />,
	},
];
