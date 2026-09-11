import {
	getAllFriends,
	getPendingFriendRequests,
	sendFriendRequest,
} from '@/api/friend/friend.api';

export type Friendship = Awaited<ReturnType<typeof sendFriendRequest>>;
export type Friend = Awaited<
	ReturnType<typeof getAllFriends>
>['friends'][number];
export type FriendRequest = Awaited<
	ReturnType<typeof getPendingFriendRequests>
>['friends'][number];
