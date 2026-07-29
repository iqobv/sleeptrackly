import { ChallengeSortBy } from '@/types/challenge/challengeSortBy.types';
import { ChallengeType } from '@/types/challenge/challengeType.types';
import { ChallengeVisibility } from '@/types/challenge/challengeVisibility.types';
import { z } from 'zod';
import { sortOrder } from '../query/sortOrder.schema';
import { tablePaginationSchema } from '../query/tablePagination.schema';

export const challengesQuerySchema = tablePaginationSchema.and(
	z.object({
		visibility: z.enum(ChallengeVisibility).optional(),
		type: z.enum(ChallengeType).optional(),
		sortBy: z.enum(ChallengeSortBy).optional(),
		sortOrder: sortOrder.optional(),
		showExpired: z.boolean().optional(),
	}),
);
