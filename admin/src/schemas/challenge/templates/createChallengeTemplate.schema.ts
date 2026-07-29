import { z } from 'zod';
import {
	bedtimeConsistencyBranch,
	bedtimeVarianceBranch,
	sleepDurationBranch,
	wakeTimeConsistencyBranch,
} from './baseChallengeTemplate.schema';

export const createChallengeTemplateSchema = z.discriminatedUnion('type', [
	sleepDurationBranch,
	bedtimeVarianceBranch,
	bedtimeConsistencyBranch,
	wakeTimeConsistencyBranch,
]);
