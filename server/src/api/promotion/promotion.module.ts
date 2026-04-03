import { Module } from '@nestjs/common';
import { ProductModule } from '../product/product.module';
import { PromotionUsageModule } from './promotion-usage/promotion-usage.module';
import { PromotionController } from './promotion.controller';
import { PromotionService } from './promotion.service';

@Module({
	controllers: [PromotionController],
	providers: [PromotionService],
	imports: [ProductModule, PromotionUsageModule],
})
export class PromotionModule {}
