import { forwardRef, Module } from '@nestjs/common';
import { CoinModule } from '../coin/coin.module';
import { UserAvatarModule } from '../user-avatar/user-avatar.module';
import { UserNotificationSettingsModule } from '../user-notification-settings/user-notification-settings.module';
import { UserSleepStatusModule } from '../user-sleep-status/user-sleep-status.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
	exports: [UserService],
	providers: [UserService],
	imports: [
		UserSleepStatusModule,
		forwardRef(() => UserAvatarModule),
		UserNotificationSettingsModule,
		CoinModule,
	],
	controllers: [UserController],
})
export class UserModule {}
