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
	@ApiProperty({ example: AchievementType.SLEEP_COUNT, enum: AchievementType })
	@IsEnum(AchievementType)
	type: AchievementType;

	@ApiProperty({ example: 10 })
	@Type(() => Number)
	@IsNumber()
	@Min(0)
	targetValue: number;

	@ApiProperty({ example: false, required: false })
	@IsOptional()
	@TransformBoolean()
	@IsBoolean()
	isActive?: boolean;

	@ApiProperty({ example: false, required: false })
	@IsOptional()
	@TransformBoolean()
	@IsBoolean()
	isHidden?: boolean;

	@ApiProperty({ example: 100, required: false })
	@Type(() => Number)
	@IsOptional()
	@IsNumber()
	@Min(0)
	rewardCoins?: number;

	@ApiProperty({ example: 'uuid', required: false })
	@IsOptional()
	@IsUUID('4')
	@Transform(({ value }: { value: string | undefined }) =>
		value === '' ? undefined : value,
	)
	rewardProductId?: string;

	@ApiProperty({ type: [AchievementTranslationDto] })
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
