import { Module } from '@nestjs/common';
import { NotificationModule } from '../notification/notification.module';
import { UserNotificationSettingsController } from './user-notification-settings.controller';
import { UserNotificationSettingsService } from './user-notification-settings.service';

@Module({
	controllers: [UserNotificationSettingsController],
	providers: [UserNotificationSettingsService],
	imports: [NotificationModule],
	exports: [UserNotificationSettingsService],
})
export class UserNotificationSettingsModule {}
