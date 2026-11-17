import { Notification } from '@/types/notification/notification.types';
import { NotificationType } from '@shared/types';
import { formatDate } from '@shared/utils';

interface NotificationContent {
	title: string;
	body?: string;
}

const getReasonMessage = (meta: Notification['meta']): string | null => {
	const reason = meta?.reason;

	if (!reason) return null;

	switch (reason) {
		case 'CONDITION_FAILED':
			return 'you did not meet the required conditions';
		case 'EXCEEDED_FROZEN_PERIOD':
			return 'the challenge was frozen for too long';
		case 'RESTORE_LIMIT_EXCEEDED':
			return 'you have exceeded the restore limit';
		default:
			return null;
	}
};

export const NOTIFICATION_MESSAGES: Partial<
	Record<NotificationType, (data: Notification) => NotificationContent>
> = {
	[NotificationType.ACHIEVEMENT_UNLOCKED]: (data) => ({
		title: 'Achievement Unlocked',
		body: `Congratulations! You've unlocked the "${data.achievement?.translation?.title || 'Unknown'}" achievement.`,
	}),

	[NotificationType.CHALLENGE_COMPLETED]: (data) => ({
		title: 'Challenge Completed',
		body: `Well done! You've successfully completed the "${data.challenge?.translation?.title || 'Unknown'}" challenge.`,
	}),

	[NotificationType.CHALLENGE_EXPIRED]: (data) => ({
		title: 'Challenge Expired',
		body: `The "${data.challenge?.translation?.title || 'Unknown'}" challenge has expired. Better luck next time!`,
	}),

	[NotificationType.CHALLENGE_FAILED]: (data) => {
		const reason = getReasonMessage(data.meta);
		const reasonText = reason ? ` because ${reason}` : '';

		return {
			title: 'Challenge Failed',
			body: `Unfortunately, you did not complete the "${data.challenge?.translation?.title || 'Unknown'}" challenge${reasonText}. Don't give up, try again!`,
		};
	},

	[NotificationType.CHALLENGE_FROZEN]: (data) => {
		const reason = getReasonMessage(data.meta);
		const reasonText = reason ? ` because ${reason}` : '';
		const recoveries =
			data.meta?.type === 'ChallengeFrozenMetaDto'
				? data.meta.recoveriesLeft
				: 0;

		return {
			title: 'Challenge Frozen',
			body: `The "${data.challenge?.translation?.title || 'Unknown'}" challenge has been frozen${reasonText}. You have ${recoveries} recoveries left and can restore the challenge to continue.`,
		};
	},

	[NotificationType.CHALLENGE_INVITATION]: (data) => ({
		title: 'Challenge Invitation',
		body: `You've been invited to join the "${data.challenge?.translation?.title || 'Unknown'}" challenge. Accept the invitation to participate!`,
	}),

	[NotificationType.CHALLENGE_RESTORED]: (data) => ({
		title: 'Challenge Restored',
		body: `The "${data.challenge?.translation?.title || 'Unknown'}" challenge has been restored. You can now continue your progress.`,
	}),

	[NotificationType.FRIEND_REQUEST]: (data) => ({
		title: 'New Friend Request',
		body: `You have received a new friend request from ${data.friendship?.username || 'a user'}.`,
	}),

	[NotificationType.SANCTION]: (data) => {
		const typeText = data.sanction?.type?.replace(/_/g, ' ').toLowerCase();
		const dateText = data.sanction?.endsAt
			? ` It will end on ${formatDate(data.sanction.endsAt)}.`
			: '';

		return {
			title: 'Sanction Notification',
			body: `You have received a sanction${typeText ? `:${typeText}` : ''}.${dateText}`,
		};
	},

	[NotificationType.STREAK_ENDED]: (data) => ({
		title: 'Streak Ended',
		body: `Your streak of ${data.streak?.length} days has ended. Keep going to build a new streak!`,
	}),

	[NotificationType.STREAK_FROZEN]: (data) => ({
		title: 'Streak Frozen',
		body: `Your streak of ${data.streak?.length || 0} days has been frozen due to inactivity. You can restore it by using a streak restore token.`,
	}),

	[NotificationType.STREAK_RESTORED]: () => ({
		title: 'Streak Restored',
		body: `Your streak has been restored. Keep up the good work!`,
	}),

	[NotificationType.WEEKLY_SUMMARY]: () => ({
		title: 'Weekly Summary Available',
		body: `Your weekly summary is now available. Check out your progress and insights!`,
	}),
};

export const getNotificationText = (
	data: Notification,
): NotificationContent => {
	const formatter = NOTIFICATION_MESSAGES[data.type];

	if (formatter) return formatter(data);

	return {
		title: data.title || 'Notification',
		body: data.body || 'You have a new update.',
	};
};
