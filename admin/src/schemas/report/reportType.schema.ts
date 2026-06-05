import { ReportType } from '@/types';
import z from 'zod';

export const reportTypeSchema = z.enum(ReportType);
