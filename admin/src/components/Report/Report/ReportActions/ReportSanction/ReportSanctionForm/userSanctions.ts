import { Option, UserSanctionType } from '@/types';

export interface UserSanctionOption extends Option {
	value: UserSanctionType;
}

export const USER_SANCTIONS_OPTIONS: UserSanctionOption[] = [
	{
		value: UserSanctionType.AVATAR_CHANGE_BAN,
		label: 'Avatar change ban',
	},
	{
		value: UserSanctionType.USERNAME_CHANGE_BAN,
		label: 'Username change ban',
	},
];
