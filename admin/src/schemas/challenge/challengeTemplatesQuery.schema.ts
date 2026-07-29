import { SortOrder } from '@/types/api/sortOrder.types';
import { ChallengeTier } from '@/types/challenge/challengeTier.types';
import { ChallengeType } from '@/types/challenge/challengeType.types';
import { ChallengeTemplateSortBy } from '@/types/challenge/templates/challengeTemplateSortBy.types';
import { z } from 'zod';
import { createBaseQuerySortingSchema } from '../query/baseSorting.schema';
import { tablePaginationSchema } from '../query/tablePagination.schema';

const challengeTemplatesSortingSchema = createBaseQuerySortingSchema(
	ChallengeTemplateSortBy,
	SortOrder,
);

export const challengeTemplatesQuerySchema = tablePaginationSchema
	.and(challengeTemplatesSortingSchema)
	.and(
		z.object({
			type: z.enum(ChallengeType).nullish(),
			tier: z.enum(ChallengeTier).nullish(),
			isActive: z.boolean().nullish(),
		}),
	);
