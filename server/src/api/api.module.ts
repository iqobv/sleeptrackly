import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ChallengeTaskModule } from './challenge-task/challenge-task.module';
import { ChallengeModule } from './challenge/challenge.module';
import { CoinTransactionModule } from './coin-transaction/coin-transaction.module';
import { CoinModule } from './coin/coin.module';
import { FriendshipModule } from './friendship/friendship.module';
import { ItemModule } from './item/item.module';
import { NotificationModule } from './notification/notification.module';
import { ProductModule } from './product/product.module';
import { ProfileModule } from './profile/profile.module';
import { PromotionModule } from './promotion/promotion.module';
import { PurchaseHistoryModule } from './purchase-history/purchase-history.module';
import { ReportModule } from './report/report.module';
import { RewardModule } from './reward/reward.module';
import { ShopModule } from './shop/shop.module';
import { SleepEntryModule } from './sleep-entry/sleep-entry.module';
import { TokenModule } from './token/token.module';
import { UserAvatarModule } from './user-avatar/user-avatar.module';
import { UserFcmTokenModule } from './user-fcm-token/user-fcm-token.module';
import { UserInventoryModule } from './user-inventory/user-inventory.module';
import { UserNotificationSettingsModule } from './user-notification-settings/user-notification-settings.module';
import { UserPrivacySettingsModule } from './user-privacy-settings/user-privacy-settings.module';
import { UserProviderModule } from './user-provider/user-provider.module';
import { UserSanctionModule } from './user-sanction/user-sanction.module';
import { UserSleepStatusModule } from './user-sleep-status/user-sleep-status.module';
import { UserModule } from './user/user.module';
import { WeeklySummaryModule } from './weekly-summary/weekly-summary.module';
import { AchievementModule } from './achievement/achievement.module';
import { ImageModule } from './image/image.module';

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
		ProfileModule,
		TokenModule,
		FriendshipModule,
		ReportModule,
		UserSanctionModule,
		UserFcmTokenModule,
		NotificationModule,
		UserNotificationSettingsModule,
		CoinModule,
		CoinTransactionModule,
		RewardModule,
		ItemModule,
		UserInventoryModule,
		ProductModule,
		PurchaseHistoryModule,
		ShopModule,
		UserPrivacySettingsModule,
		PromotionModule,
		WeeklySummaryModule,
		AchievementModule,
		ImageModule,
	],
})
export class ApiModule {}
