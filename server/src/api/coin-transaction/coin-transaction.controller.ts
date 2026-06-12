import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CoinTransactionService } from './coin-transaction.service';
import { CoinTransactionDto } from './dto/coin-transaction.dto';

@Auth()
@ApiTags('Coin Transactions')
@Controller('coin-transactions')
export class CoinTransactionController {
	constructor(
		private readonly coinTransactionService: CoinTransactionService,
	) {}

	/** Get coin transactions of the authenticated user */
	@Get('me')
	@ApiOkResponse({ type: [CoinTransactionDto] })
	public async getUserCoinTransactions(
		@Authorized('id') userId: string,
	): Promise<CoinTransactionDto[]> {
		return await this.coinTransactionService.getUserTransactions(userId);
	}
}
