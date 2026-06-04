import { Module } from '@nestjs/common';
import { NotificationModule } from '../notification/notification.module';
import {
	UserNotificationSettingsCronService,
	UserNotificationSettingsService,
} from './services';
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
