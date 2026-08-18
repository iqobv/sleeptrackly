import { CoinTransactionModule } from '@api/coin-transaction/coin-transaction.module';
import { Module } from '@nestjs/common';
import { RewardProductService } from './services/reward-product.service';
import { RewardService } from './services/reward.service';

@Module({
	imports: [CoinTransactionModule],
	providers: [RewardService, RewardProductService],
	exports: [RewardService, RewardProductService],
})
export class RewardModule {}
