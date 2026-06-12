import { CoinTransactionModule } from '@api/coin-transaction/coin-transaction.module';
import { ImageModule } from '@api/image/image.module';
import { NotificationModule } from '@api/notification/notification.module';
import { UserInventoryModule } from '@api/user-inventory/user-inventory.module';
import { Module } from '@nestjs/common';
import { AchievementController } from './achievement.controller';
import { AchievementCrudService } from './services/achievement-crud.service';
import { AchievementProgressService } from './services/achievement-progress.service';

@Module({
	controllers: [AchievementController],
	imports: [
		ImageModule,
		CoinTransactionModule,
		UserInventoryModule,
		NotificationModule,
	],
	exports: [AchievementProgressService],
	providers: [AchievementCrudService, AchievementProgressService],
})
export class AchievementModule {}
