import { sendReportSchema } from '@/schemas/report/report.schema';
import z from 'zod';

export type SendReportFormValues = z.input<typeof sendReportSchema>;
export type SendReportDto = z.output<typeof sendReportSchema>;
