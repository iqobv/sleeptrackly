import { changeRequestStatus, deleteFriend, sendFriendRequest } from '@/api';
import { FRIEND_STATUS } from '@/constants';
import { Friend, Friendship, FriendStatus } from '@/types';

interface ProfileButton {
	text: string;
	onClick?: () => void;
	mutationFn: (data?: {
		id: string;
		status?: FriendStatus;
	}) => Promise<Friend> | void;
	isShow?: boolean;
	isDisabled?: boolean;
	successText?: string;
}

export const SUCCESS_TEXT = 'Friend request sent';

export const DEFAULT_BUTTON = (
	profileUserId: string,
	userId?: string | null | undefined,
): ProfileButton => ({
	text: 'Add to friends',
	mutationFn: () => sendFriendRequest(profileUserId),
	isShow: false,
	isDisabled: userId === profileUserId,
	successText: SUCCESS_TEXT,
});

export const PROFILE_FRIENDS_BUTTONS = (
	profileUserId: string,
	friendship: Friendship | null,
	userId: string | null | undefined,
): Record<FriendStatus, ProfileButton> => ({
	[FRIEND_STATUS.ACCEPTED]: {
		text: 'Unfriend',
		mutationFn: () => {
			if (!friendship?.id || !userId || !profileUserId) return;

			return deleteFriend(friendship.id);
		},
		successText: "You're not friends anymore",
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
		successText:
			userId === friendship?.requesterId
				? 'Request canceled'
				: 'Friend request accepted',
		isDisabled: userId === profileUserId,
	},
	[FRIEND_STATUS.REJECTED]: DEFAULT_BUTTON(profileUserId, userId),
	[FRIEND_STATUS.BLOCKED]: {
		...(userId === friendship?.requesterId
			? {
					text: 'Unblock',
					mutationFn: () => {
						if (!friendship?.id || !userId || !profileUserId) return;

						return deleteFriend(friendship?.id);
					},
					successText: 'Unblocked',
				}
			: { ...DEFAULT_BUTTON(profileUserId, userId), isDisabled: true }),
	},
});
