import { dashboardQuerySchema } from '@/schemas/dashboard/dashboardQuery.schema';
import z from 'zod';

export type DashboardQueryDto = z.infer<typeof dashboardQuerySchema>;
