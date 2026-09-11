import { ReportType } from '@/types/report/reportType.types';
import z from 'zod';

export const reportTypeSchema = z.enum(ReportType);
