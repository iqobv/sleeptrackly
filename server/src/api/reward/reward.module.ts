import { CoinTransactionModule } from '@api/coin-transaction/coin-transaction.module';
import { Module } from '@nestjs/common';
import { RewardService } from './reward.service';

@Module({
	imports: [CoinTransactionModule],
	providers: [RewardService],
	exports: [RewardService],
})
export class RewardModule {}
