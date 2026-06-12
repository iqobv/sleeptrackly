import { IsFutureDate } from '@libs/validators/is-future-date.validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsDate,
	IsNumber,
	IsOptional,
	IsString,
	IsUUID,
	Min,
	MinLength,
} from 'class-validator';

export class CreatePromotionDto {
	@ApiProperty({ example: 'alias' })
	@IsOptional()
	@IsString()
	@MinLength(5)
	alias?: string;

	@ApiProperty({ example: 5 })
	@IsOptional()
	@IsNumber()
	@Min(0)
	maxUses?: number;

	@ApiProperty({ example: new Date(Date.now() + 86400000) })
	@IsOptional()
	@Type(() => Date)
	@IsDate()
	@IsFutureDate()
	expiresAt?: Date;

	@ApiProperty({ example: 0 })
	@IsOptional()
	@IsNumber()
	@Min(0)
	coinsReward?: number;

	@ApiProperty({ example: 'product-id' })
	@IsOptional()
	@IsUUID('4')
	productIdReward?: string;
}
