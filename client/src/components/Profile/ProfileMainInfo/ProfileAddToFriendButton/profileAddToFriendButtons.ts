import {
	changeRequestStatus,
	deleteFriend,
	sendFriendRequest,
} from '@/api/friend/friend.api';
import { Friendship } from '@/types/friend/friend.types';
import { FriendStatus } from '@/types/friend/friendStatus.types';

type FriendMutationResponse =
	| Awaited<ReturnType<typeof sendFriendRequest>>
	| Awaited<ReturnType<typeof deleteFriend>>
	| Awaited<ReturnType<typeof changeRequestStatus>>;

interface ProfileButton<T> {
	text: string;
	onClick?: () => void;
	mutationFn: () => Promise<T> | void;
	isShow?: boolean;
	isDisabled?: boolean;
	successText?: string;
}

export const SUCCESS_TEXT = 'Friend request sent';

export const DEFAULT_BUTTON = (
	profileUserId: string,
	userId?: string | null | undefined,
): ProfileButton<Friendship> => ({
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
): Record<FriendStatus, ProfileButton<FriendMutationResponse>> => ({
	[FriendStatus.ACCEPTED]: {
		text: 'Unfriend',
		mutationFn: () => {
			if (!friendship?.id || !userId || !profileUserId) return;

			return deleteFriend(friendship.id);
		},
		successText: "You're not friends anymore",
	},
	[FriendStatus.PENDING]: {
		text:
			userId === friendship?.requesterId ? 'Cancel request' : 'Accept request',
		mutationFn: () => {
			if (!friendship?.id || !userId || !profileUserId) return;

			if (userId === friendship?.requesterId)
				return deleteFriend(friendship.id);

			return changeRequestStatus(friendship.id, FriendStatus.ACCEPTED);
		},
		successText:
			userId === friendship?.requesterId
				? 'Request canceled'
				: 'Friend request accepted',
		isDisabled: userId === profileUserId,
	},
	[FriendStatus.REJECTED]: DEFAULT_BUTTON(profileUserId, userId),
	[FriendStatus.BLOCKED]:
		userId === friendship?.requesterId
			? {
					text: 'Unblock',
					mutationFn: () => {
						if (!friendship?.id || !userId || !profileUserId) return;
						return deleteFriend(friendship?.id);
					},
					successText: 'Unblocked',
				}
			: { ...DEFAULT_BUTTON(profileUserId, userId), isDisabled: true },
});
