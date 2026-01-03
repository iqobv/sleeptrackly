import { Module } from '@nestjs/common';
import { CoinController } from './coin.controller';
import { CoinService } from './coin.service';

@Module({
	controllers: [CoinController],
	exports: [CoinService],
	providers: [CoinService],
})
export class CoinModule {}
