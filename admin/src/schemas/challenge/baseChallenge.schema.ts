import { ChallengeTier } from '@/types/challenge/challengeTier.types';
import { ChallengeType } from '@/types/challenge/challengeType.types';
import { ChallengeVisibility } from '@/types/challenge/challengeVisibility.types';
import { z } from 'zod';
import {
	bedtimeVarianceMetadataSchema,
	sleepDurationMetadataSchema,
	timeConsistencyMetadataSchema,
} from './challengeMetadata.schema';
import { challengeTranslationSchema } from './challengeTranslation.schema';

const utcDateSchema = z.string().transform((val, ctx) => {
	const utcString = val.endsWith('Z') ? val : `${val}Z`;
	const date = new Date(utcString);

	if (isNaN(date.getTime())) {
		ctx.addIssue({
			code: 'custom',
			message: 'Invalid date format',
			path: ['availableFrom', 'availableTo'],
		});
		return z.NEVER;
	}

	return date;
});

export const baseChallengeSchema = z.object({
	dailyRewardCoins: z.coerce
		.number()
		.int()
		.min(0, 'Daily reward coins must be a non-negative integer'),
	durationDays: z.coerce
		.number()
		.int()
		.positive('Duration days must be a positive integer'),
	maxRecoveries: z.coerce
		.number()
		.int()
		.min(0, 'Max recoveries must be a non-negative integer'),
	rewardCoins: z.coerce
		.number()
		.int()
		.min(0, 'Reward coins must be a non-negative integer'),
	targetValue: z.coerce
		.number()
		.int()
		.positive('Target value must be a positive integer'),
	tier: z.enum(ChallengeTier),
	visibility: z.enum(ChallengeVisibility),
	availableFrom: utcDateSchema,
	availableTo: utcDateSchema,
	rewardProductId: z.string().nullable().optional(),
	translations: z
		.array(challengeTranslationSchema)
		.min(1, 'At least one translation is required'),
});

export const sleepDurationBranch = baseChallengeSchema.extend({
	type: z.literal(ChallengeType.SLEEP_DURATION),
	metadata: sleepDurationMetadataSchema,
});

export const bedtimeVarianceBranch = baseChallengeSchema.extend({
	type: z.literal(ChallengeType.BEDTIME_VARIANCE),
	metadata: bedtimeVarianceMetadataSchema,
});

export const bedtimeConsistencyBranch = baseChallengeSchema.extend({
	type: z.literal(ChallengeType.BEDTIME_CONSISTENCY),
	metadata: timeConsistencyMetadataSchema,
});

export const wakeTimeConsistencyBranch = baseChallengeSchema.extend({
	type: z.literal(ChallengeType.WAKE_TIME_CONSISTENCY),
	metadata: timeConsistencyMetadataSchema,
});
