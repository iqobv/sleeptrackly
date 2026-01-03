import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ChallengeTaskModule } from './challenge-task/challenge-task.module';
import { ChallengeModule } from './challenge/challenge.module';
import { FriendshipModule } from './friendship/friendship.module';
import { ImageModule } from './image/image.module';
import { ProfileModule } from './profile/profile.module';
import { ReportModule } from './report/report.module';
import { SleepEntryModule } from './sleep-entry/sleep-entry.module';
import { TokenModule } from './token/token.module';
import { UserAvatarModule } from './user-avatar/user-avatar.module';
import { UserProviderModule } from './user-provider/user-provider.module';
import { UserSanctionModule } from './user-sanction/user-sanction.module';
import { UserSleepStatusModule } from './user-sleep-status/user-sleep-status.module';
import { UserModule } from './user/user.module';
import { UserFcmTokenModule } from './user-fcm-token/user-fcm-token.module';
import { NotificationModule } from './notification/notification.module';
import { UserNotificationSettingsModule } from './user-notification-settings/user-notification-settings.module';
import { CoinModule } from './coin/coin.module';

@Module({
	imports: [
		UserModule,
		AuthModule,
		UserProviderModule,
		SleepEntryModule,
		UserSleepStatusModule,
		ChallengeModule,
		ChallengeTaskModule,
		UserAvatarModule,
		ImageModule,
		ProfileModule,
		TokenModule,
		FriendshipModule,
		ReportModule,
		UserSanctionModule,
		UserFcmTokenModule,
		NotificationModule,
		UserNotificationSettingsModule,
		CoinModule,
	],
})
export class ApiModule {}
