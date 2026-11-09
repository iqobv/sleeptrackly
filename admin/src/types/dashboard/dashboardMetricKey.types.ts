import { Dashboard, DashboardMetric } from './dashboard.types';

export type DashboardMetricKey = {
	[K in keyof Dashboard]: Dashboard[K] extends DashboardMetric ? K : never;
}[keyof Dashboard];
