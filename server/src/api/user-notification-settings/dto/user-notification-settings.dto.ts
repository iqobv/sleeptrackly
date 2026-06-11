import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { Expose } from 'class-transformer';
export class UserNotificationSettingsDto extends DefaultFieldsDto {
	@Expose() userId: string;
	@Expose() isEmailNotificationsEnabled: boolean;
	@Expose() isInAppNotificationsEnabled: boolean;
	@Expose() isReminderEnabled: boolean;
	@Expose() isUpdatesEnabled: boolean;
	@Expose() isFriendRequestsEnabled: boolean;
	@Expose() isAchievementUnlockedEnabled: boolean;
	@Expose() reminderTime: string | null;
	@Expose() userTimeZone: string | null;
}
