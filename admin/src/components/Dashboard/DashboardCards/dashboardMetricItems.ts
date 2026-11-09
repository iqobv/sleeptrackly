import { DashboardMetric } from '@/types/dashboard/dashboard.types';
import { DashboardMetricKey } from '@/types/dashboard/dashboardMetricKey.types';

interface MetricItem {
	key: DashboardMetricKey;
	title: string;
	tooltip?: string;
}

export interface DashboardMetricItem extends MetricItem {
	data: DashboardMetric;
}

export const DASHBOARD_METRIC_ITEMS: MetricItem[] = [
	{
		key: 'registered',
		title: 'Registered Users',
	},
	{
		key: 'activeUsers',
		title: 'Active Users',
		tooltip:
			'This metric indicates the number of users who have logged and interacted with the application within the last 7 days.',
	},
	{
		key: 'achievements',
		title: 'Achievements Unlocked',
	},
	{
		key: 'challengesStarted',
		title: 'Challenges Started',
	},
	{
		key: 'challengesCompleted',
		title: 'Challenges Completed',
	},
	{
		key: 'challengesFailed',
		title: 'Challenges Failed',
	},
	{
		key: 'purchases',
		title: 'Purchases Made',
	},
];
