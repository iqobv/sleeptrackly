import { z } from 'zod';
import {
	bedtimeConsistencyBranch,
	bedtimeVarianceBranch,
	sleepDurationBranch,
	wakeTimeConsistencyBranch,
} from './baseChallenge.schema';

export const updateChallengeSchema = z
	.discriminatedUnion('type', [
		sleepDurationBranch.partial().required({ type: true }),
		bedtimeVarianceBranch.partial().required({ type: true }),
		bedtimeConsistencyBranch.partial().required({ type: true }),
		wakeTimeConsistencyBranch.partial().required({ type: true }),
	])
	.superRefine(({ availableFrom, availableTo }, ctx) => {
		if (availableFrom && availableTo) {
			if (availableFrom >= availableTo) {
				ctx.addIssue({
					code: 'custom',
					message: 'Available from date must be earlier than available to date',
					path: ['availableFrom', 'availableTo'],
				});
			}
		}

		if (availableFrom && availableFrom < new Date()) {
			ctx.addIssue({
				code: 'custom',
				message: 'Available from date must be in the future',
				path: ['availableFrom'],
			});
		}
	});
