import { FriendStatus } from './friendStatus.types';

export interface Friend {
	id: string;
	status: FriendStatus;
	createdAt: Date;
	user: {
		id: string;
		username: string;
		avatar: string;
		status: string;
	};
}
