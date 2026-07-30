import { ChallengeQueryDto } from '@/dto/challenge/challenge.dto';
import { ChallengeSortBy } from '@/types/challenge/challengeSortBy.types';
import { ChallengeTier } from '@/types/challenge/challengeTier.types';
import { ChallengeType } from '@/types/challenge/challengeType.types';
import { ChallengeVisibility } from '@/types/challenge/challengeVisibility.types';
import { StrictParsersMap } from '@/types/parserMap.types';
import {
	createOptionalStringEnumParser,
	createTableParsers,
} from '@/utils/tableUrlParser.util';
import { SortOrder } from '@shared/tables';
import { createSearchParamsCache, parseAsBoolean } from 'nuqs/server';

export const challengeTemplatesParsers = createTableParsers(
	ChallengeSortBy,
	null,
	SortOrder,
	null,
	{
		type: createOptionalStringEnumParser(ChallengeType),
		tier: createOptionalStringEnumParser(ChallengeTier),
		visibility: createOptionalStringEnumParser(ChallengeVisibility),
		showExpired: parseAsBoolean,
	},
) satisfies StrictParsersMap<ChallengeQueryDto>;

export const monitorFiltersSearchParamsCache = createSearchParamsCache(
	challengeTemplatesParsers,
);
