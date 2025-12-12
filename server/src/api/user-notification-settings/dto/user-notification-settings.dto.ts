import { ApiProperty } from '@nestjs/swagger';

export class UserNotificationSettingsDto {
	@ApiProperty({ example: '75aaeb48-1088-4014-95df-6769c552af05' })
	id: string;

	@ApiProperty({ example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
	userId: string;

	@ApiProperty({ example: true })
	isEmailNotificationsEnabled: boolean;

	@ApiProperty({ example: true })
	isInAppNotificationsEnabled: boolean;

	@ApiProperty({ example: true })
	isReminderEnabled: boolean;

	@ApiProperty({ example: true })
	isUpdatesEnabled: boolean;

	@ApiProperty({ example: true })
	isFriendRequestsEnabled: boolean;

	@ApiProperty({ example: true })
	isAchievementUnlockedEnabled: boolean;

	@ApiProperty({ example: '09:30' })
	reminderTime: string | null;

	@ApiProperty({ example: 'America/New_York' })
	userTimeZone: string | null;

	@ApiProperty({ example: new Date() })
	createdAt: Date;

	@ApiProperty({ example: new Date() })
	updatedAt: Date;
}
