import { USER_SANCTIONS } from '@/constants';
import { IUser } from './user.types';

export type TUserSanction =
	(typeof USER_SANCTIONS)[keyof typeof USER_SANCTIONS];

export interface IUserSanction {
	id: string;
	userId: string;
	reportId: string;
	createdById: string;
	startsAt: Date;
	endsAt: Date;
	type: TUserSanction;
	user: IUser;
	createdBy: IUser;
	createdAt: Date;
	updatedAt: Date;
}
