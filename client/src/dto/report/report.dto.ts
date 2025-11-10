import { sendReportSchema } from '@/schemas';
import z from 'zod';

export type SendReportDto = z.infer<typeof sendReportSchema>;
