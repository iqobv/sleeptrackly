import { z } from 'zod';
import {
	bedtimeConsistencyBranch,
	bedtimeVarianceBranch,
	sleepDurationBranch,
	wakeTimeConsistencyBranch,
} from './baseChallenge.schema';

export const createChallengeSchema = z
	.discriminatedUnion('type', [
		sleepDurationBranch,
		bedtimeVarianceBranch,
		bedtimeConsistencyBranch,
		wakeTimeConsistencyBranch,
	])
	.superRefine(({ availableFrom, availableTo }, ctx) => {
		if (availableFrom >= availableTo) {
			ctx.addIssue({
				code: 'custom',
				message: 'Available from date must be earlier than available to date',
				path: ['availableFrom', 'availableTo'],
			});
		}

		if (availableFrom < new Date()) {
			ctx.addIssue({
				code: 'custom',
				message: 'Available from date must be in the future',
				path: ['availableFrom'],
			});
		}
	});
