import { Auth, Authorized } from '@libs/decorators';
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CoinService } from './coin.service';
import { CoinDto } from './dto';

@Controller('coins')
export class CoinController {
	constructor(private readonly coinService: CoinService) {}

	@Auth()
	@ApiOperation({ summary: 'Get user coin balance' })
	@ApiOkResponse({ type: CoinDto })
	@Get()
	async getCoins(@Authorized('id') userId: string) {
		return await this.coinService.getUserCoin(userId);
	}
}
