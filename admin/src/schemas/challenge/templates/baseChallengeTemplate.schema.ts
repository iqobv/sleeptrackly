import { ChallengeTier } from '@/types/challenge/challengeTier.types';
import { ChallengeType } from '@/types/challenge/challengeType.types';
import { z } from 'zod';
import {
	bedtimeVarianceMetadataSchema,
	sleepDurationMetadataSchema,
	timeConsistencyMetadataSchema,
} from './challengeTemplateMetadata.schema';
import { challengeTemplateTranslationSchema } from './challengeTemplateTranslation.schema';

export const baseChallengeTemplateSchema = z.object({
	isActive: z.boolean().default(true),
	tier: z.enum(ChallengeTier),
	translations: z
		.array(challengeTemplateTranslationSchema)
		.min(1, 'At least one translation is required'),
});

export const baseGenerationMetadataSchema = z.object({
	durations: z
		.array(z.number().int().positive())
		.min(1, 'At least one duration is required'),
});

export const sleepDurationBranch = baseChallengeTemplateSchema.extend({
	type: z.literal(ChallengeType.SLEEP_DURATION),
	generationRules: baseGenerationMetadataSchema.extend({
		metadata: sleepDurationMetadataSchema,
	}),
});

export const bedtimeVarianceBranch = baseChallengeTemplateSchema.extend({
	type: z.literal(ChallengeType.BEDTIME_VARIANCE),
	generationRules: baseGenerationMetadataSchema.extend({
		metadata: bedtimeVarianceMetadataSchema,
	}),
});

export const bedtimeConsistencyBranch = baseChallengeTemplateSchema.extend({
	type: z.literal(ChallengeType.BEDTIME_CONSISTENCY),
	generationRules: baseGenerationMetadataSchema.extend({
		metadata: timeConsistencyMetadataSchema,
	}),
});

export const wakeTimeConsistencyBranch = baseChallengeTemplateSchema.extend({
	type: z.literal(ChallengeType.WAKE_TIME_CONSISTENCY),
	generationRules: baseGenerationMetadataSchema.extend({
		metadata: timeConsistencyMetadataSchema,
	}),
});
