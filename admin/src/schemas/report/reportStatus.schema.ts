import { ReportStatus } from '@/types';
import z from 'zod';

export const reportStatusSchema = z.enum(ReportStatus);
