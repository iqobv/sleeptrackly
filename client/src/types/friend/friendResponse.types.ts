import { Friend } from './friend.types';

export interface FriendsResponse {
	friends: Friend[];
	countOfPendingRequests: number;
}
