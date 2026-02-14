import { Module } from '@nestjs/common';
import { PurchaseHistoryController } from './purchase-history.controller';
import { PurchaseHistoryService } from './purchase-history.service';

@Module({
	controllers: [PurchaseHistoryController],
	exports: [PurchaseHistoryService],
	providers: [PurchaseHistoryService],
})
export class PurchaseHistoryModule {}
