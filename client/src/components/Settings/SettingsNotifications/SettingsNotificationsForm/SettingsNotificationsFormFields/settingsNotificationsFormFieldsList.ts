import { UpdateNotificationSettingsDto } from '@/dto/settings/notifications.dto';

interface SettingsNotificationsField {
	label: string;
	name: keyof UpdateNotificationSettingsDto;
	tooltip?: string;
}

export const SETTINGS_NOTIFICATIONS_FIELDS: SettingsNotificationsField[] = [
	{
		name: 'isEmailNotificationsEnabled',
		label: 'Enable Email Notifications',
		tooltip:
			'Receive notifications via email for important updates and alerts.',
	},
	{
		name: 'isInAppNotificationsEnabled',
		label: 'Enable In-App Notifications',
		tooltip:
			'Receive notifications directly within the app for real-time updates.',
	},
	{
		name: 'isFriendRequestsEnabled',
		label: 'Notify on Friend Requests',
		tooltip: 'Receive notifications when you receive new friend requests.',
	},
	{
		name: 'isUpdatesEnabled',
		label: 'Notify on Updates',
		tooltip: 'Receive notifications about important updates and changes.',
	},
	{
		name: 'isAchievementUnlockedEnabled',
		label: 'Notify on Achievement Unlocked',
		tooltip: 'Receive notifications when you unlock new achievements.',
	},
];
