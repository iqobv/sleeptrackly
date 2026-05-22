import z from 'zod';

export const userSleepStatusSchema = z.object({
	dateForChart: z.string().optional(),
});
