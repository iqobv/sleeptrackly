import { z } from 'zod';
import { ChallengeSchema } from './challenge';

export const CreateChallengeSchema = ChallengeSchema.extend({
	frequency: z.enum(['DAILY', 'WEEKLY', 'MONTHLY', 'ONCE'], {
		error: 'Frequency is required',
	}),
	startDate: z.preprocess(
		(val) => (typeof val === 'string' ? new Date(val) : val),
		z
			.date({ error: 'Start date is required' })
			.min(new Date(), { message: 'Start date cannot be in the past' })
			.transform((date) => new Date(date).toISOString())
	),
	endDate: z.preprocess(
		(val) => (typeof val === 'string' ? new Date(val) : val),
		z
			.date({ error: 'End date is required' })
			.min(new Date(), { message: 'End date cannot be in the past' })
			.transform((date) => new Date(date).toISOString())
	),
	tasksOptions: z.object({
		value: z.preprocess(
			(val) => (typeof val === 'string' ? Number(val) : val),
			z
				.number({ error: 'Value is required' })
				.min(1, { message: 'Value is required' })
		),
		increment: z.preprocess(
			(val) => (typeof val === 'string' ? Number(val) : val),
			z.number().min(1, { message: 'Increment is required' })
		),
		description: z.preprocess(
			(val) => (typeof val === 'string' ? val : val),
			z.string().min(1, { message: 'Description is required' })
		),
	}),
});
