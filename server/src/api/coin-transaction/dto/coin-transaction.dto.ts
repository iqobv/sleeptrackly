import { ApiProperty } from '@nestjs/swagger';
import { JsonValue } from '@prisma/client/runtime/client';
import { CoinTransactionType } from 'generated/prisma/enums';

export class CoinTransactionDto {
	@ApiProperty({ example: '79d4f5d7-35ef-4a6d-ad3e-e0d8eaa2983a' })
	id: string;

	@ApiProperty({ example: 'b1a1c8e2-3c4d-4e5f-9a6b-7c8d9e0f1a2b' })
	userId: string;

	@ApiProperty({ example: 'd2f5e6c7-8b9a-0b1c-2d3e-4f5a6b7c8d9e' })
	userCoinId: string;

	@ApiProperty({
		example: CoinTransactionType.SLEEP_REWARD,
		enum: CoinTransactionType,
	})
	type: CoinTransactionType;

	@ApiProperty({ example: 1500 })
	amount: number;

	@ApiProperty({ example: 5000 })
	balanceAfter: number;

	@ApiProperty({ example: 3500 })
	balanceBefore: number;

	@ApiProperty({ example: { sleepDuration: 420 }, nullable: true })
	meta: JsonValue | null;

	@ApiProperty({
		example: 'a3b2c1d4-e5f6-7a8b-9c0d-e1f2a3b4c5d6',
		nullable: true,
	})
	referenceId: string | null;

	@ApiProperty({ example: new Date().toISOString() })
	createdAt: Date;
	@ApiProperty({ example: new Date().toISOString() })
	updatedAt: Date;
}
