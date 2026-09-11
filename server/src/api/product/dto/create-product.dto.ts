import { Type } from 'class-transformer';
import {
	IsBoolean,
	IsDate,
	IsNumber,
	IsOptional,
	IsUUID,
	Min,
} from 'class-validator';

export class CreateProductDto {
	@IsUUID('4')
	@IsOptional()
	bundleId?: string;

	@IsUUID('4')
	@IsOptional()
	itemId?: string;

	@IsBoolean()
	@IsOptional()
	isNew?: boolean;

	@IsBoolean()
	@IsOptional()
	isExclusive?: boolean;

	@IsBoolean()
	isShowInStore: boolean;

	@IsBoolean()
	@IsOptional()
	isLimited?: boolean;

	@IsNumber()
	@Min(0)
	@IsOptional()
	price?: number;

	@IsNumber()
	@Min(0)
	@IsOptional()
	discountedPrice?: number;

	@IsNumber()
	@Min(0)
	@IsOptional()
	maxStock?: number;

	@IsOptional()
	@Type(() => Date)
	@IsDate()
	expiresAt?: Date;
}
