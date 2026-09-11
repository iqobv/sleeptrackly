import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CoinService } from './coin.service';
import { BaseCoinDto } from './dto/coin.dto';

@Auth()
@ApiTags('Coins')
@Controller('coins')
export class CoinController {
	constructor(private readonly coinService: CoinService) {}

	/** Get user balance */
	@Get()
	@ApiOkResponse({ type: BaseCoinDto })
	public async getCoins(
		@Authorized('id') userId: string,
	): Promise<BaseCoinDto> {
		return await this.coinService.getUserCoin(userId);
	}
}
