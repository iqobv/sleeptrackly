import { TFriendStatus } from './friendStatus.types';

export interface IFriend {
	id: string;
	status: TFriendStatus;
	createdAt: Date;
	user: {
		id: string;
		username: string;
		avatar: string;
		isSleeping: boolean;
	};
}
