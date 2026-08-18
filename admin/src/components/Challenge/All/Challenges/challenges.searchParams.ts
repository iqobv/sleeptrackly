import { ChallengeQueryDto } from '@/dto/challenge/challenge.dto';
import { StrictParsersMap } from '@/types/parserMap.types';
import {
	createOptionalStringEnumParser,
	createTableParsers,
} from '@/utils/tableUrlParser.util';
import { SortOrder } from '@shared/tables';
import {
	ChallengeSortBy,
	ChallengeTier,
	ChallengeType,
	ChallengeVisibility,
} from '@shared/types';
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
