import { ApiProperty } from '@nestjs/swagger';
import {
	IsBoolean,
	IsDate,
	IsNumber,
	IsOptional,
	IsUUID,
	Min,
} from 'class-validator';

export class CreateProductDto {
	@ApiProperty({
		example: '9592a724-6522-4a8a-b375-3d3523facd70',
		required: false,
	})
	@IsUUID('4')
	@IsOptional()
	bundleId?: string;

	@ApiProperty({
		example: '9592a724-6522-4a8a-b375-3d3523facd70',
		required: false,
	})
	@IsUUID('4')
	@IsOptional()
	itemId?: string;

	@ApiProperty({ example: true, required: false })
	@IsBoolean()
	@IsOptional()
	isNew?: boolean;

	@ApiProperty({ example: false, required: false })
	@IsBoolean()
	@IsOptional()
	isExclusive?: boolean;

	@ApiProperty({ example: true })
	@IsBoolean()
	isShowInStore: boolean;

	@ApiProperty({ example: true, required: false })
	@IsBoolean()
	@IsOptional()
	isLimited?: boolean;

	@ApiProperty({ example: 1000, required: false })
	@IsNumber()
	@Min(0)
	@IsOptional()
	price?: number;

	@ApiProperty({ example: null, required: false })
	@IsNumber()
	@Min(0)
	@IsOptional()
	discountedPrice?: number;

	@ApiProperty({ example: 200, required: false })
	@IsNumber()
	@Min(0)
	@IsOptional()
	maxStock?: number;

	@ApiProperty({ example: new Date(), required: false })
	@IsDate()
	@IsOptional()
	expiresAt?: Date;
}
