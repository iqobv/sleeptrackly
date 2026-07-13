import { ChallengeType, ChallengeVisibility } from '@generated/prisma/enums';
import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import {
	ApiExtraModels,
	ApiPropertyOptional,
	getSchemaPath,
} from '@nestjs/swagger';
import {
	Expose,
	plainToInstance,
	Transform,
	TransformFnParams,
	Type,
} from 'class-transformer';
import { ChallengeTranslationEntityDto } from './challenge-translation.dto';
import { BedtimeVarianceMetadataDto } from './metadata/bedtime-variance-metadata.dto';
import { SleepDurationMetadataDto } from './metadata/sleep-duration-metadata.dto';
import { TimeConsistencyMetadataDto } from './metadata/time-consistency-metadata.dto';

export const transformMetadata = ({
	obj,
	value,
}: TransformFnParams): unknown => {
	const metadata = value as unknown;

	if (!metadata) return metadata;

	switch ((obj as { type?: ChallengeType }).type) {
		case ChallengeType.SLEEP_DURATION:
			return plainToInstance(SleepDurationMetadataDto, metadata);
		case ChallengeType.BEDTIME_CONSISTENCY:
			return plainToInstance(TimeConsistencyMetadataDto, metadata);
		case ChallengeType.WAKE_TIME_CONSISTENCY:
			return plainToInstance(TimeConsistencyMetadataDto, metadata);
		case ChallengeType.BEDTIME_VARIANCE:
			return plainToInstance(BedtimeVarianceMetadataDto, metadata);
		default:
			return metadata;
	}
};

@ApiExtraModels(
	SleepDurationMetadataDto,
	TimeConsistencyMetadataDto,
	BedtimeVarianceMetadataDto,
)
export class ChallengeEntityDto extends DefaultFieldsDto {
	@Expose() type: ChallengeType;
	@Expose() availableFrom: Date | null;
	@Expose() availableTo: Date | null;
	@Expose() visibility: ChallengeVisibility;
	@Expose() durationDays: number;
	@Expose() targetValue: number;
	@Expose() maxRecoveries: number;

	@ApiPropertyOptional({
		oneOf: [
			{ $ref: getSchemaPath(SleepDurationMetadataDto) },
			{ $ref: getSchemaPath(TimeConsistencyMetadataDto) },
			{ $ref: getSchemaPath(BedtimeVarianceMetadataDto) },
		],
		additionalProperties: false,
	})
	@Expose()
	@Transform(transformMetadata)
	metadata?:
		| SleepDurationMetadataDto
		| TimeConsistencyMetadataDto
		| BedtimeVarianceMetadataDto
		| null;

	@Expose() rewardCoins: number;
	@Expose() dailyRewardCoins: number;
	@Expose() rewardProductId: string | null;

	@Type(() => ChallengeTranslationEntityDto)
	@Expose()
	translations: ChallengeTranslationEntityDto[];
}
