import { Module } from '@nestjs/common';
import { CoinTransactionModule } from 'src/api/coin-transaction/coin-transaction.module';
import { ProductModule } from 'src/api/product/product.module';
import { PurchaseHistoryModule } from 'src/api/purchase-history/purchase-history.module';
import { ShopModule } from 'src/api/shop/shop.module';
import { UserInventoryModule } from 'src/api/user-inventory/user-inventory.module';
import { PromotionUsageController } from './promotion-usage.controller';
import { PromotionUsageService } from './promotion-usage.service';

@Module({
	imports: [
		CoinTransactionModule,
		ShopModule,
		PurchaseHistoryModule,
		UserInventoryModule,
		ProductModule,
	],
	controllers: [PromotionUsageController],
	providers: [PromotionUsageService],
})
export class PromotionUsageModule {}
