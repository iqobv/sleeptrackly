import { CoinTransactionType } from '@generated/prisma/enums';
import {
	IsEnum,
	IsNumber,
	IsObject,
	IsOptional,
	IsUUID,
} from 'class-validator';

export class CreateCoinTransactionDto {
	@IsNumber({
		allowNaN: false,
		allowInfinity: false,
	})
	amount: number;

	/** @example SLEEP_REWARD */
	@IsEnum(CoinTransactionType)
	transactionType: CoinTransactionType;

	@IsUUID('4')
	userId: string;

	@IsUUID('4')
	@IsOptional()
	referenceId?: string;

	/**
	 *	@example { sleepSessionId: '550e8400-e29b-41d4-a716-446655440000',		multiplier: 2, }
	 */
	@IsObject()
	@IsOptional()
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	meta?: Record<string, any>;
}
