import { PickType } from '@nestjs/swagger';
import { CoinEntityDto } from './coin.entity.dto';

export class BaseCoinDto extends CoinEntityDto {}

export class UserCoinDto extends PickType(CoinEntityDto, ['amount'] as const) {}
