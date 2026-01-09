import { ApiProperty } from '@nestjs/swagger';
import { ProfileItemType } from '@prisma/client';
import {
	IsArray,
	IsBoolean,
	IsDate,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	Min,
} from 'class-validator';
import { TranslationDto } from './translation.dto';

export class CreateItemDto {
	@ApiProperty({ example: true, required: false })
	@IsBoolean()
	@IsOptional()
	isLimited?: boolean;

	@ApiProperty({ example: true, required: false })
	@IsBoolean()
	@IsOptional()
	isShowInStore?: boolean;

	@ApiProperty({ example: true, required: false })
	@IsBoolean()
	@IsOptional()
	isNew?: boolean;

	@ApiProperty({ example: false, required: false })
	@IsBoolean()
	@IsOptional()
	isExclusive?: boolean;

	@ApiProperty({ example: ProfileItemType.AVATAR_FRAME })
	@IsEnum(ProfileItemType)
	type: ProfileItemType;

	@ApiProperty({ example: 1200 })
	@IsNumber()
	@Min(0)
	price: number;

	@ApiProperty({ example: 100, required: false })
	@IsNumber()
	@Min(0)
	@IsOptional()
	maxStock?: number;

	@ApiProperty({ example: 'http://example.com/media/item.gif' })
	@IsString()
	mediaUrl: string;

	@ApiProperty({ type: [TranslationDto] })
	@IsArray()
	translations: TranslationDto[];

	@ApiProperty({ example: new Date(), required: false })
	@IsDate()
	@IsOptional()
	expiresAt?: Date;
}
