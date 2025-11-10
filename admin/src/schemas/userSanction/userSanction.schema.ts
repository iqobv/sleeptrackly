import { USER_SANCTIONS } from '@/constants';
import z from 'zod';

export const userSanctionSchema = z
	.object({
		reportId: z.string().optional(),
		targetUserId: z.string().nonempty({ error: 'Target user ID is required' }),
		startsAt: z.preprocess(
			(val) => (typeof val === 'string' ? new Date(val) : val),
			z.date({ error: 'Start date is required' })
		),
		endsAt: z.preprocess(
			(val) => (typeof val === 'string' ? new Date(val) : val),
			z
				.date({ error: 'End date is required' })
				.min(new Date(), { message: 'End date cannot be in the future' })
		),
		type: z.enum(Object.values(USER_SANCTIONS), { error: 'Type is required' }),
	})
	.refine((data) => data.startsAt <= data.endsAt, {
		message: 'Start date cannot be after end date',
		path: ['endsAt'],
	});
