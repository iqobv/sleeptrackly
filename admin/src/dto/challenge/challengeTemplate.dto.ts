import { challengeTemplatesQuerySchema } from '@/schemas/challenge/challengeTemplatesQuery.schema';
import { baseGenerationMetadataSchema } from '@/schemas/challenge/templates/baseChallengeTemplate.schema';
import { challengeTemplateTranslationSchema } from '@/schemas/challenge/templates/challengeTemplateTranslation.schema';
import { createChallengeTemplateSchema } from '@/schemas/challenge/templates/createChallengeTemplate.schema';
import { updateChallengeTemplateSchema } from '@/schemas/challenge/templates/updateChallengeTemplate.schema';
import { ChallengeType } from '@/types/challenge/challengeType.types';
import { z } from 'zod';

export type CreateChallengeTemplateDto = z.infer<
	typeof createChallengeTemplateSchema
>;
export type UpdateChallengeTemplateDto = z.infer<
	typeof updateChallengeTemplateSchema
>;
export type ChallengeTranslationDto = z.infer<
	typeof challengeTemplateTranslationSchema
>;
export type ChallengeTemplatesQueryDto = z.infer<
	typeof challengeTemplatesQuerySchema
>;
export type BaseGenerationRulesMetadataDto = z.infer<
	typeof baseGenerationMetadataSchema
>;

export type SleepDurationMetadataDto = Extract<
	CreateChallengeTemplateDto,
	{ type: typeof ChallengeType.SLEEP_DURATION }
>['generationRules']['metadata'];

export type BedtimeVarianceMetadataDto = Extract<
	CreateChallengeTemplateDto,
	{ type: typeof ChallengeType.BEDTIME_VARIANCE }
>['generationRules']['metadata'];

export type TimeConsistencyMetadataDto = Extract<
	CreateChallengeTemplateDto,
	{
		type:
			| typeof ChallengeType.BEDTIME_CONSISTENCY
			| typeof ChallengeType.WAKE_TIME_CONSISTENCY;
	}
>['generationRules']['metadata'];
