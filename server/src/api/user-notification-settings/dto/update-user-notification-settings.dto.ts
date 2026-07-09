import { IsBoolean, IsOptional, IsString, Matches } from 'class-validator';

export class UpdateUserNotificationSettingsDto {
	@IsBoolean()
	@IsOptional()
	isEmailNotificationsEnabled?: boolean;

	@IsBoolean()
	@IsOptional()
	isInAppNotificationsEnabled?: boolean;

	@IsBoolean()
	@IsOptional()
	isReminderEnabled?: boolean;

	@IsBoolean()
	@IsOptional()
	isUpdatesEnabled?: boolean;

	@IsBoolean()
	@IsOptional()
	isFriendRequestsEnabled?: boolean;

	@IsBoolean()
	@IsOptional()
	isAchievementUnlockedEnabled?: boolean;

	@IsString()
	@Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
		message: 'dailyTime must be a valid time in HH:MM format (e.g., "09:30").',
	})
	@IsOptional()
	reminderTime?: string;
}
