import z from 'zod';

export const SettingsNotificationsSchema = z.object({
	isEmailNotificationsEnabled: z.boolean().optional(),
	isInAppNotificationsEnabled: z.boolean().optional(),
	isReminderEnabled: z.boolean().optional(),
	isUpdatesEnabled: z.boolean().optional(),
	isFriendRequestsEnabled: z.boolean().optional(),
	isAchievementUnlockedEnabled: z.boolean().optional(),
	reminderTime: z.string().nullable().optional(),
	userTimeZone: z.string().nullable().optional(),
});
