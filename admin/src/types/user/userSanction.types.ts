import { USER_SANCTIONS } from '@/constants';
import { User } from './user.types';

export type UserSanctionType =
	(typeof USER_SANCTIONS)[keyof typeof USER_SANCTIONS];

export interface UserSanction {
	id: string;
	userId: string;
	reportId: string;
	createdById: string;
	startsAt: Date;
	endsAt: Date;
	type: UserSanctionType;
	user: User;
	createdBy: User;
	createdAt: Date;
	updatedAt: Date;
}
