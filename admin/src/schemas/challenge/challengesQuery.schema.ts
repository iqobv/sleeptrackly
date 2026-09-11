import { SortOrder } from '@shared/tables';
import {
	ChallengeSortBy,
	ChallengeTier,
	ChallengeType,
	ChallengeVisibility,
} from '@shared/types';
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
