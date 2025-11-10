import { REPORT_STATUS } from '@/constants';
import z from 'zod';

export const reportStatusSchema = z.enum(
	Object.values(REPORT_STATUS) as [string, ...string[]]
);
