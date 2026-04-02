import { IFriend } from './friend.types';

export interface IFriendsResponse {
	friends: IFriend[];
	countOfPendingRequests: number;
}
