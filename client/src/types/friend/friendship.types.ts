import { TFriendStatus } from './friendStatus.types';

export interface IFriendship {
	id: string;
	requesterId: string;
	addresseeId: string;
	status: TFriendStatus;
}
