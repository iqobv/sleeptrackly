import { REPORT_TYPES } from '@/constants';
import z from 'zod';

export const reportTypeSchema = z.enum(
	Object.values(REPORT_TYPES) as [string, ...string[]]
);
