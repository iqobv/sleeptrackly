'use client';

import { useQueryStates } from 'nuqs';
import { challengeTemplatesParsers } from './challengeTemplates.searchParams';

export const useChallengeTemplatesFilters = () => {
	return useQueryStates(challengeTemplatesParsers);
};
