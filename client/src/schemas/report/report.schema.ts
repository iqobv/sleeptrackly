import { REPORT_TYPES } from '@/constants';
import z from 'zod';

export const sendReportSchema = z.object({
	title: z
		.string()
		.min(3, { error: 'Title must be at least 3 characters' })
		.nonempty({ error: 'Title is required' }),
	description: z.string().optional(),
	reportType: z.enum(REPORT_TYPES, { error: 'Report type is required' }),
	reportedId: z.string().nonempty({ error: 'Reported ID is required' }),
});
