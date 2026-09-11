import { CoinTransactionModule } from '@api/coin-transaction/coin-transaction.module';
import { PurchaseHistoryModule } from '@api/purchase-history/purchase-history.module';
import { ShopModule } from '@api/shop/shop.module';
import { UserInventoryModule } from '@api/user-inventory/user-inventory.module';
import { Module } from '@nestjs/common';
import { PromotionUsageController } from './promotion-usage.controller';
import { PromotionUsageService } from './promotion-usage.service';

@Module({
	imports: [
		CoinTransactionModule,
		ShopModule,
		PurchaseHistoryModule,
		UserInventoryModule,
	],
	controllers: [PromotionUsageController],
	providers: [PromotionUsageService],
})
export class PromotionUsageModule {}
