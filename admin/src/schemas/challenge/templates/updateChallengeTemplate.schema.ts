import { z } from 'zod';
import {
	bedtimeConsistencyBranch,
	bedtimeVarianceBranch,
	sleepDurationBranch,
	wakeTimeConsistencyBranch,
} from './baseChallengeTemplate.schema';

export const updateChallengeTemplateSchema = z.discriminatedUnion('type', [
	sleepDurationBranch.partial().required({ type: true }),
	bedtimeVarianceBranch.partial().required({ type: true }),
	bedtimeConsistencyBranch.partial().required({ type: true }),
	wakeTimeConsistencyBranch.partial().required({ type: true }),
]);
