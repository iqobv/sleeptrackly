import { AchievementType } from '@generated/prisma/enums';
import { TransformBoolean, TransformTranslations } from '@libs/decorators';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
	IsArray,
	IsBoolean,
	IsEnum,
	IsNumber,
	IsOptional,
	IsUUID,
	Min,
	ValidateNested,
} from 'class-validator';
import { AchievementTranslationDto } from './achievement-translation.dto';

export class CreateAchievementDto {
	/**
	 * Type of the achievement, which determines the criteria for unlocking it.
	 * @example SLEEP_COUNT
	 */
	@IsEnum(AchievementType)
	type: AchievementType;

	@Type(() => Number)
	@IsNumber()
	@Min(0)
	targetValue: number;

	@IsOptional()
	@TransformBoolean()
	@IsBoolean()
	isActive?: boolean;

	@IsOptional()
	@TransformBoolean()
	@IsBoolean()
	isHidden?: boolean;

	@Type(() => Number)
	@IsOptional()
	@IsNumber()
	@Min(0)
	rewardCoins?: number;

	/**
	 * Optional ID of the product that can be redeemed with this achievement. Must be a valid UUID if provided.
	 * @example 123e4567-e89b-12d3-a456-426614174000
	 */
	@IsOptional()
	@IsUUID('4')
	@Transform(({ value }: { value: string | undefined }) =>
		value === '' ? undefined : value,
	)
	rewardProductId?: string;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => AchievementTranslationDto)
	@TransformTranslations(AchievementTranslationDto)
	translations: AchievementTranslationDto[];
}

export class CreateAchievementSwaggerDto extends CreateAchievementDto {
	@ApiProperty({ type: 'string', format: 'binary' })
	icon?: Express.Multer.File;
}
