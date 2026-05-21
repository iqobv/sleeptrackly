import { forwardRef, Module } from '@nestjs/common';
import { CoinModule } from '../coin/coin.module';
import { UserAvatarModule } from '../user-avatar/user-avatar.module';
import { UserInventoryModule } from '../user-inventory/user-inventory.module';
import { UserNotificationSettingsModule } from '../user-notification-settings/user-notification-settings.module';
import { UserPrivacySettingsModule } from '../user-privacy-settings/user-privacy-settings.module';
import { UserSleepStatusModule } from '../user-sleep-status/user-sleep-status.module';
import { UserCleanupService } from './user-cleanup.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
	exports: [UserService],
	providers: [UserService, UserCleanupService],
	imports: [
		UserSleepStatusModule,
		forwardRef(() => UserAvatarModule),
		UserNotificationSettingsModule,
		CoinModule,
		UserInventoryModule,
		UserPrivacySettingsModule,
	],
	controllers: [UserController],
})
export class UserModule {}
