import { Module } from '@nestjs/common';
import { CoinTransactionController } from './coin-transaction.controller';
import { CoinTransactionService } from './coin-transaction.service';

@Module({
	controllers: [CoinTransactionController],
	exports: [CoinTransactionService],
	providers: [CoinTransactionService],
})
export class CoinTransactionModule {}
