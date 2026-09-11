import { challengesQuerySchema } from '@/schemas/challenge/challengesQuery.schema';
import { challengeTranslationSchema } from '@/schemas/challenge/challengeTranslation.schema';
import { createChallengeSchema } from '@/schemas/challenge/createChallenge.schema';
import { updateChallengeSchema } from '@/schemas/challenge/updateChallenge.schema';
import { ChallengeType } from '@/types/challenge/challengeType.types';
import { z } from 'zod';

export type ChallengeQueryDto = z.infer<typeof challengesQuerySchema>;

export type CreateChallengeDto = z.infer<typeof createChallengeSchema>;
export type UpdateChallengeDto = z.infer<typeof updateChallengeSchema>;
export type ChallengeTranslationDto = z.infer<
	typeof challengeTranslationSchema
>;

export type SleepDurationMetadataDto = Extract<
	CreateChallengeDto,
	{ type: typeof ChallengeType.SLEEP_DURATION }
>['metadata'];

export type BedtimeVarianceMetadataDto = Extract<
	CreateChallengeDto,
	{ type: typeof ChallengeType.BEDTIME_VARIANCE }
>['metadata'];

export type TimeConsistencyMetadataDto = Extract<
	CreateChallengeDto,
	{
		type:
			| typeof ChallengeType.BEDTIME_CONSISTENCY
			| typeof ChallengeType.WAKE_TIME_CONSISTENCY;
	}
>['metadata'];
