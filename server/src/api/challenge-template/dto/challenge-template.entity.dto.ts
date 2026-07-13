import { ChallengeTier, ChallengeType } from '@generated/prisma/enums';
import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance, Transform, Type } from 'class-transformer';
import { ChallengeTemplateTranslationEntityDto } from './challenge-template-translation.entity.dto';
import { GenerationRulesDto } from './generation-rules.dto';
import { GenerationBedtimeVarianceMetadataDto } from './metadata/bedtime-variance.dto';
import { GenerationSleepDurationMetadataDto } from './metadata/sleep-duration.dto';
import { GenerationTimeConsistencyMetadataDto } from './metadata/time-consistency.dto';

@ApiExtraModels(
	GenerationBedtimeVarianceMetadataDto,
	GenerationTimeConsistencyMetadataDto,
	GenerationSleepDurationMetadataDto,
)
export class ChallengeTemplateEntityDto extends DefaultFieldsDto {
	@Expose()
	@ApiProperty({ enum: ChallengeTier, enumName: 'ChallengeTier' })
	tier: ChallengeTier;

	@Expose()
	@ApiProperty({ enum: ChallengeType, enumName: 'ChallengeType' })
	type: ChallengeType;

	@Expose()
	@Transform(({ obj, value }) => {
		if (!value) return value as unknown;

		const template = obj as { type?: ChallengeType };
		const rawRules = value as GenerationRulesDto;

		let metadataInstance;

		switch (template.type) {
			case ChallengeType.SLEEP_DURATION:
				metadataInstance = plainToInstance(
					GenerationSleepDurationMetadataDto,
					rawRules.metadata,
				);
				break;
			case ChallengeType.BEDTIME_CONSISTENCY:
			case ChallengeType.WAKE_TIME_CONSISTENCY:
				metadataInstance = plainToInstance(
					GenerationTimeConsistencyMetadataDto,
					rawRules.metadata,
				);
				break;
			case ChallengeType.BEDTIME_VARIANCE:
				metadataInstance = plainToInstance(
					GenerationBedtimeVarianceMetadataDto,
					rawRules.metadata,
				);
				break;
			default:
				metadataInstance = rawRules.metadata;
		}

		const rulesInstance = plainToInstance(GenerationRulesDto, rawRules);
		rulesInstance.metadata = metadataInstance;

		return rulesInstance;
	})
	generationRules: GenerationRulesDto;

	@Expose()
	isActive: boolean;

	@Expose()
	lastUsedAt: Date | null;

	@Expose()
	@Type(() => ChallengeTemplateTranslationEntityDto)
	translations: ChallengeTemplateTranslationEntityDto;
}
