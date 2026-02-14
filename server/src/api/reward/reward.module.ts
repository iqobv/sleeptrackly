import { Module } from '@nestjs/common';
import { CoinTransactionModule } from '../coin-transaction/coin-transaction.module';
import { RewardService } from './reward.service';

@Module({
	imports: [CoinTransactionModule],
	providers: [RewardService],
	exports: [RewardService],
})
export class RewardModule {}
