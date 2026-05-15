import { FriendStatus } from './friendStatus.types';

export interface Friendship {
	id: string;
	requesterId: string;
	addresseeId: string;
	status: FriendStatus;
}
