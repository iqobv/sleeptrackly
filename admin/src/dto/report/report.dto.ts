import { reportPaginationQuerySchema } from '@/schemas/report/reportPaginationQuery.schema';
import { reportStatusSchema } from '@/schemas/report/reportStatus.schema';
import { reportTypeSchema } from '@/schemas/report/reportType.schema';
import z from 'zod';

export type ReportPaginationQueryDto = z.infer<
	typeof reportPaginationQuerySchema
>;
export type ReportStatusDto = z.infer<typeof reportStatusSchema>;
export type ReportTypeDto = z.infer<typeof reportTypeSchema>;
