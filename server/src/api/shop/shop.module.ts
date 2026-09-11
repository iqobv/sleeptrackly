import { AchievementModule } from '@api/achievement/achievement.module';
import { CoinTransactionModule } from '@api/coin-transaction/coin-transaction.module';
import { PurchaseHistoryModule } from '@api/purchase-history/purchase-history.module';
import { UserInventoryModule } from '@api/user-inventory/user-inventory.module';
import { Module } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';

@Module({
	controllers: [ShopController],
	imports: [
		CoinTransactionModule,
		PurchaseHistoryModule,
		UserInventoryModule,
		AchievementModule,
	],
	exports: [ShopService],
	providers: [ShopService],
})
export class ShopModule {}
