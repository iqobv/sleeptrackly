import { ApiProperty } from '@nestjs/swagger';
import { CoinTransactionType } from '@prisma/client';
import { IsEnum, IsJSON, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateCoinTransactionDto {
	@ApiProperty({
		example: 100,
	})
	@IsNumber({
		allowNaN: false,
		allowInfinity: false,
	})
	amount: number;

	@ApiProperty({
		enum: CoinTransactionType,
		example: CoinTransactionType.SLEEP_REWARD,
	})
	@IsEnum(CoinTransactionType)
	transactionType: CoinTransactionType;

	@ApiProperty({
		example: '550e8400-e29b-41d4-a716-446655440000',
	})
	@IsUUID('4')
	userId: string;

	// @ApiProperty({
	// 	example: '550e8400-e29b-41d4-a716-446655440000',
	// })
	// @IsUUID('4')
	// userCoinId: string;

	@ApiProperty({
		example: '550e8400-e29b-41d4-a716-446655440000',
		required: false,
	})
	@IsUUID('4')
	@IsOptional()
	referenceId?: string;

	// @ApiProperty({
	// 	example: 500,
	// })
	// @IsNumber({
	// 	allowNaN: false,
	// 	allowInfinity: false,
	// })
	// @Min(0)
	// balanceBefore: number;

	// @ApiProperty({
	// 	example: 600,
	// })
	// @IsNumber({
	// 	allowNaN: false,
	// 	allowInfinity: false,
	// })
	// @Min(0)
	// balanceAfter: number;

	@ApiProperty({
		example: {
			sleepSessionId: '550e8400-e29b-41d4-a716-446655440000',
			multiplier: 2,
		},
		required: false,
	})
	@IsJSON()
	@IsOptional()
	meta?: JSON;
}
