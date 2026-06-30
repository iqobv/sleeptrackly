import { z } from 'zod';

export const validateDateRange = (
	data: { sleepStart?: string; sleepEnd?: string },
	ctx: z.RefinementCtx,
) => {
	if (data.sleepStart && data.sleepEnd) {
		if (new Date(data.sleepStart) >= new Date(data.sleepEnd)) {
			ctx.addIssue({
				code: 'custom',
				message: 'sleepStart must be before sleepEnd',
				path: ['sleepStart'],
			});
		}
	}
};

export const updateSleepEntrySchema = z
	.object({
		rating: z.coerce.number().min(1).max(5),
		sleepStart: z.iso.datetime().optional(),
		sleepEnd: z.iso.datetime().optional(),
	})
	.superRefine((data, ctx) => validateDateRange(data, ctx));
