import { ChallengeTemplatesQueryDto } from '@/dto/challenge/challengeTemplate.dto';
import { SortOrder } from '@/types/api/sortOrder.types';
import { ChallengeTier } from '@/types/challenge/challengeTier.types';
import { ChallengeType } from '@/types/challenge/challengeType.types';
import { ChallengeTemplateSortBy } from '@/types/challenge/templates/challengeTemplateSortBy.types';
import { StrictParsersMap } from '@/types/parserMap.types';
import {
	createOptionalStringEnumParser,
	createTableParsers,
} from '@/utils/tableUrlParser.util';
import { createSearchParamsCache, parseAsBoolean } from 'nuqs/server';

export const challengeTemplatesParsers = createTableParsers(
	ChallengeTemplateSortBy,
	null,
	SortOrder,
	null,
	{
		type: createOptionalStringEnumParser(ChallengeType),
		tier: createOptionalStringEnumParser(ChallengeTier),
		isActive: parseAsBoolean,
	},
) satisfies StrictParsersMap<ChallengeTemplatesQueryDto>;

export const monitorFiltersSearchParamsCache = createSearchParamsCache(
	challengeTemplatesParsers,
);
