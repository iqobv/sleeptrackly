import { ChallengeSortBy } from '@/types/challenge/challengeSortBy.types';
import { ChallengeTier } from '@/types/challenge/challengeTier.types';
import { ChallengeType } from '@/types/challenge/challengeType.types';
import { ChallengeVisibility } from '@/types/challenge/challengeVisibility.types';
import { SortOrder } from '@shared/tables';
import { z } from 'zod';
import { createBaseQuerySortingSchema } from '../query/baseSorting.schema';
import { sortOrder } from '../query/sortOrder.schema';
import { tablePaginationSchema } from '../query/tablePagination.schema';

const challengeSortingSchema = createBaseQuerySortingSchema(
	ChallengeSortBy,
	SortOrder,
);

export const challengesQuerySchema = tablePaginationSchema
	.and(challengeSortingSchema)
	.and(
		z.object({
			tier: z.enum(ChallengeTier).nullish(),
			visibility: z.enum(ChallengeVisibility).nullish(),
			type: z.enum(ChallengeType).nullish(),
			sortBy: z.enum(ChallengeSortBy).nullish(),
			sortOrder: sortOrder.nullish(),
			showExpired: z.boolean().nullish(),
		}),
	);
