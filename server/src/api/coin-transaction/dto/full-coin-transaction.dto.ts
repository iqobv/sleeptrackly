import { ApiProperty } from '@nestjs/swagger';
import { CoinTransactionDto } from './coin-transaction.dto';

export class FullCoinTransactionDto {
	@ApiProperty({ example: 1500 })
	balance: number;

	@ApiProperty({ type: CoinTransactionDto })
	transaction: CoinTransactionDto;
}
