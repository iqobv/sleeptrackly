import { FullReport } from '../report/report.types';
import { components } from '@shared/types';

type SwaggerUserSanctionType = components['schemas']['UserSanctionType'];

export const UserSanctionType = {
	AVATAR_CHANGE_BAN: 'AVATAR_CHANGE_BAN',
	USERNAME_CHANGE_BAN: 'USERNAME_CHANGE_BAN',
} as const satisfies Record<SwaggerUserSanctionType, SwaggerUserSanctionType>;

export type UserSanctionType =
	(typeof UserSanctionType)[keyof typeof UserSanctionType];

export type UserSanction = NonNullable<FullReport['sanctions']>[number];
