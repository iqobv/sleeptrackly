import { changeRequestStatus, deleteFriend } from '@/api';
import { FRIEND_STATUS } from '@/constants';
import { MutationFunction } from '@tanstack/react-query';

export interface FriendItemMenu {
	label: string;
	mutationFn: MutationFunction<unknown, string>;
	successText: string;
}

export const FRIEND_ITEM_MENU: FriendItemMenu[] = [
	{
		label: 'Unfriend',
		successText: 'You are no longer friends',
		mutationFn: (id: string) => deleteFriend(id),
	},
	{
		label: 'Block',
		successText: "You've blocked this user",
		mutationFn: (userId: string) =>
			changeRequestStatus(userId, FRIEND_STATUS.BLOCKED),
	},
];
