export interface INotificationSettings {
	id: string;
	userId: string;
	isEmailNotificationsEnabled: boolean;
	isInAppNotificationsEnabled: boolean;
	isReminderEnabled: boolean;
	isUpdatesEnabled: boolean;
	isFriendRequestsEnabled: boolean;
	isAchievementUnlockedEnabled: boolean;
	reminderTime: string | null;
	userTimeZone: string | null;
	createdAt: Date;
	updatedAt: Date;
}
