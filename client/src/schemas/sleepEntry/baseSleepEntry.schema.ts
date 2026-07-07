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

	if (data.sleepEnd) {
		if (new Date(data.sleepEnd) > new Date()) {
			ctx.addIssue({
				code: 'custom',
				message: 'sleepEnd cannot be in the future',
				path: ['sleepEnd'],
			});
		}
	}
};

const localDatetimeToIso = z
	.string()
	.refine((val) => val === '' || !isNaN(Date.parse(val)), {
		message: 'Invalid date',
	})
	.transform((val) => (val === '' ? undefined : new Date(val).toISOString()));

export const dateForChartSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
	message: 'Invalid date format, expected YYYY-MM-DD',
});

export const baseSleepEntrySchema = z.object({
	rating: z.coerce
		.number()
		.min(1, { error: 'Rating must be greater than or equal to 1' })
		.max(5, { error: 'Rating must be less than or equal to 5' }),
	sleepStart: localDatetimeToIso,
	sleepEnd: localDatetimeToIso,
	dateForChart: dateForChartSchema,
});
