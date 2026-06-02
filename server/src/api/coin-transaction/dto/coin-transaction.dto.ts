import { CoinTransactionType } from '@generated/prisma/enums';
import { DefaultFieldsDto } from '@libs/dto';
import { JsonValue } from '@prisma/client/runtime/client';
import { Expose } from 'class-transformer';

export class CoinTransactionDto extends DefaultFieldsDto {
	@Expose() userId: string;
	@Expose() userCoinId: string;
	@Expose() type: CoinTransactionType;
	@Expose() amount: number;
	@Expose() balanceAfter: number;
	@Expose() balanceBefore: number;
	@Expose() meta: JsonValue | null;
	@Expose() referenceId: string | null;
}
