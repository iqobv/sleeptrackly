import { ReportStatus } from '@/types/report/reportStatus.types';
import z from 'zod';

export const reportStatusSchema = z.enum(ReportStatus);
