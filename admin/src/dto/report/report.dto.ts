import {
	reportPaginationQuerySchema,
	reportStatusSchema,
	reportTypeSchema,
} from '@/schemas';
import z from 'zod';

export type ReportPaginationQueryDto = z.infer<
	typeof reportPaginationQuerySchema
>;
export type ReportStatusDto = z.infer<typeof reportStatusSchema>;
export type ReportTypeDto = z.infer<typeof reportTypeSchema>;
