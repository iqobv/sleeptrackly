import { NotificationModule } from '@api/notification/notification.module';
import { Module } from '@nestjs/common';
import { UserNotificationSettingsCronService } from './services/user-notification-settings-cron.service';
import { UserNotificationSettingsService } from './services/user-notification-settings.service';
import { UserNotificationSettingsController } from './user-notification-settings.controller';

@Module({
	controllers: [UserNotificationSettingsController],
	providers: [
		UserNotificationSettingsService,
		UserNotificationSettingsCronService,
	],
	imports: [NotificationModule],
	exports: [UserNotificationSettingsService],
})
export class UserNotificationSettingsModule {}
