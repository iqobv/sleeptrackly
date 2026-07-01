import { z } from 'zod';

export const reminderTimeSchema = z.object({
	isReminderEnabled: z.boolean().optional(),
	reminderTime: z.string().nullable().optional(),
	userTimeZone: z.string().nullable().optional(),
});

export const settingsNotificationsSchema = reminderTimeSchema.extend({
	isEmailNotificationsEnabled: z.boolean().optional(),
	isInAppNotificationsEnabled: z.boolean().optional(),
	isUpdatesEnabled: z.boolean().optional(),
	isFriendRequestsEnabled: z.boolean().optional(),
	isAchievementUnlockedEnabled: z.boolean().optional(),
});
