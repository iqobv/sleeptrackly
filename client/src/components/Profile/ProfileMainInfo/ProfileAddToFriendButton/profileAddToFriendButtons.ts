import { changeRequestStatus, deleteFriend, sendFriendRequest } from '@/api';
import { FRIEND_STATUS } from '@/constants';
import { IFriend, IFriendship, TFriendStatus } from '@/types';

interface ProfileButton {
	text: string;
	onClick?: () => void;
	mutationFn: (data?: {
		id: string;
		status?: TFriendStatus;
	}) => Promise<IFriend> | void;
	isShow?: boolean;
	isDisabled?: boolean;
}

export const DEFAULT_BUTTON = (
	profileUserId: string,
	userId?: string | null | undefined
): ProfileButton => ({
	text: 'Add to friends',
	mutationFn: () => sendFriendRequest(profileUserId),
	isShow: false,
	isDisabled: userId === profileUserId,
});

export const PROFILE_FRIENDS_BUTTONS = (
	profileUserId: string,
	friendship: IFriendship | null,
	userId: string | null | undefined
): Record<TFriendStatus, ProfileButton> => ({
	[FRIEND_STATUS.ACCEPTED]: {
		text: 'In friends',
		mutationFn: () => {},
		isDisabled: true,
	},
	[FRIEND_STATUS.PENDING]: {
		text:
			userId === friendship?.requesterId ? 'Cancel request' : 'Accept request',
		mutationFn: () => {
			if (!friendship?.id || !userId || !profileUserId) return;

			if (userId === friendship?.requesterId)
				return deleteFriend(friendship.id);

			return changeRequestStatus(friendship.id, FRIEND_STATUS.ACCEPTED);
		},
		isDisabled: userId === profileUserId,
	},
	[FRIEND_STATUS.REJECTED]: {
		text: 'Request rejected',
		mutationFn: () => {},
		isDisabled: true,
	},
	[FRIEND_STATUS.BLOCKED]: {
		text: 'Blocked',
		mutationFn: () => {},
		isDisabled: true,
	},
});
