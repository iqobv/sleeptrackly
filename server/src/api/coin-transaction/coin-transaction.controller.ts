import { Auth, Authorized } from '@libs/decorators';
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CoinTransactionService } from './coin-transaction.service';
import { CoinTransactionDto } from './dto';

@ApiTags('Coin Transactions')
@Controller('coin-transactions')
export class CoinTransactionController {
	constructor(
		private readonly coinTransactionService: CoinTransactionService,
	) {}

	@ApiOperation({ summary: 'Get coin transactions of the authenticated user' })
	@ApiOkResponse({ type: [CoinTransactionDto] })
	@Auth()
	@Get('me')
	async getUserCoinTransactions(@Authorized('id') userId: string) {
		return await this.coinTransactionService.getUserTransactions(userId);
	}
}
