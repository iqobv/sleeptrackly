import {
	ChallengeTier,
	ChallengeType,
	ChallengeVisibility,
} from '@generated/prisma/enums';
import { IsBefore } from '@libs/validators/is-before.validator';
import { IsChallengeMetadata } from '@libs/validators/is-challenge-metadata.validator';
import { IsFutureDate } from '@libs/validators/is-future-date.validator';
import {
	ApiExtraModels,
	ApiProperty,
	ApiPropertyOptional,
	getSchemaPath,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	ArrayMinSize,
	IsDate,
	IsEnum,
	IsNumber,
	IsObject,
	IsOptional,
	IsUUID,
	Min,
} from 'class-validator';
import { CreateChallengeTranslationDto } from './create-challenge-translation.dto';
import { BedtimeVarianceMetadataDto } from './metadata/bedtime-variance-metadata.dto';
import { SleepDurationMetadataDto } from './metadata/sleep-duration-metadata.dto';
import { TimeConsistencyMetadataDto } from './metadata/time-consistency-metadata.dto';

@ApiExtraModels(
	SleepDurationMetadataDto,
	TimeConsistencyMetadataDto,
	BedtimeVarianceMetadataDto,
)
export class CreateChallengeDto {
	@ApiProperty({ enum: ChallengeType, enumName: 'ChallengeType' })
	@IsEnum(ChallengeType)
	type: ChallengeType;

	@ApiProperty({ enum: ChallengeTier, enumName: 'ChallengeTier' })
	@IsEnum(ChallengeTier)
	tier: ChallengeTier;

	@IsOptional()
	@Type(() => Date)
	@IsDate()
	@IsBefore('availableTo')
	@IsFutureDate()
	availableFrom?: Date | null;

	@IsOptional()
	@Type(() => Date)
	@IsDate()
	@IsFutureDate()
	availableTo?: Date | null;

	@ApiProperty({ enum: ChallengeVisibility, enumName: 'ChallengeVisibility' })
	@IsEnum(ChallengeVisibility)
	visibility: ChallengeVisibility;

	@IsNumber()
	@Min(1)
	durationDays: number;

	@IsNumber()
	@Min(0)
	targetValue: number;

	@IsNumber()
	@Min(0)
	maxRecoveries: number;

	@ApiPropertyOptional({
		type: 'object',
		oneOf: [
			{ $ref: getSchemaPath(SleepDurationMetadataDto) },
			{ $ref: getSchemaPath(TimeConsistencyMetadataDto) },
			{ $ref: getSchemaPath(BedtimeVarianceMetadataDto) },
		],
		additionalProperties: false,
	})
	@IsOptional()
	@IsChallengeMetadata()
	metadata?:
		| SleepDurationMetadataDto
		| TimeConsistencyMetadataDto
		| BedtimeVarianceMetadataDto;

	@IsNumber()
	@Min(0)
	rewardCoins: number;

	@IsNumber()
	@Min(0)
	dailyRewardCoins: number;

	@IsOptional()
	@IsUUID('4')
	rewardProductId?: string | null;

	@Type(() => CreateChallengeTranslationDto)
	@ArrayMinSize(1)
	@IsObject({ each: true })
	translations: CreateChallengeTranslationDto[];
}
