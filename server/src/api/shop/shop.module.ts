import { AchievementModule } from '@api/achievement/achievement.module';
import { Module } from '@nestjs/common';
import { CoinTransactionModule } from '../coin-transaction/coin-transaction.module';
import { PurchaseHistoryModule } from '../purchase-history/purchase-history.module';
import { UserInventoryModule } from '../user-inventory/user-inventory.module';
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
