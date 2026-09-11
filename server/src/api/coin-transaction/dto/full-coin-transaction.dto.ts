import { Expose, Type } from 'class-transformer';
import { CoinTransactionDto } from './coin-transaction.dto';

export class FullCoinTransactionDto {
	@Expose() balance: number;

	@Expose()
	@Type(() => CoinTransactionDto)
	transaction: CoinTransactionDto;
}
