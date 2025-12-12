import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, Matches } from 'class-validator';

export class UpdateUserNotificationSettingsDto {
	@ApiProperty({ example: true, required: false })
	@IsBoolean()
	@IsOptional()
	isEmailNotificationsEnabled?: boolean;

	@ApiProperty({ example: true, required: false })
	@IsBoolean()
	@IsOptional()
	isInAppNotificationsEnabled?: boolean;

	@ApiProperty({ example: true, required: false })
	@IsBoolean()
	@IsOptional()
	isReminderEnabled?: boolean;

	@ApiProperty({ example: true, required: false })
	@IsBoolean()
	@IsOptional()
	isUpdatesEnabled?: boolean;

	@ApiProperty({ example: true, required: false })
	@IsBoolean()
	@IsOptional()
	isFriendRequestsEnabled?: boolean;

	@ApiProperty({ example: true, required: false })
	@IsBoolean()
	@IsOptional()
	isAchievementUnlockedEnabled?: boolean;

	@ApiProperty({ example: '09:30', required: false })
	@IsString()
	@Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
		message: 'dailyTime must be a valid time in HH:MM format (e.g., "09:30").',
	})
	@IsOptional()
	reminderTime?: string;

	@ApiProperty({ example: 'America/New_York', required: false })
	@IsString()
	@IsOptional()
	userTimeZone?: string;
}
