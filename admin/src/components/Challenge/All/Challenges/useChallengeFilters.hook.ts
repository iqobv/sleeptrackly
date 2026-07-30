'use client';

import { useQueryStates } from 'nuqs';
import { challengeTemplatesParsers } from './challenges.searchParams';

export const useChallengeFilters = () => {
	return useQueryStates(challengeTemplatesParsers);
};
