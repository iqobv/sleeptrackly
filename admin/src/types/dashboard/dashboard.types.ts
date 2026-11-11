import { getDashboard } from '@/api/dashboard/getDashboard.api';
import { components } from '@shared/types';

export type Dashboard = Awaited<ReturnType<typeof getDashboard>>;
export type DashboardMetric = components['schemas']['StatisticsMetricsDto'];
