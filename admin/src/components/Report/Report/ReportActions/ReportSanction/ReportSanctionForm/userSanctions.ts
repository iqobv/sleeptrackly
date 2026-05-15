import { USER_SANCTIONS } from '@/constants';
import { Option } from '@/types';

export interface UserSanctionOption extends Option {
	value: (typeof USER_SANCTIONS)[keyof typeof USER_SANCTIONS];
}

export const USER_SANCTIONS_OPTIONS: UserSanctionOption[] = [
	{
		value: USER_SANCTIONS.AVATAR_CHANGE_BAN,
		label: 'Avatar change ban',
	},
	{
		value: USER_SANCTIONS.USERNAME_CHANGE_BAN,
		label: 'Username change ban',
	},
];
