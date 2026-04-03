import { IDashboard } from '@/types';

interface DashboardWeekStatsCard {
	title: string;
	value: number;
}

export const DASHBOARD_WEEK_STATS_CARDS = (
	data: IDashboard,
): DashboardWeekStatsCard[] => {
	return [
		{
			title: 'Total Rest',
			value: data.statistics.totalSleepDuration,
		},
		{
			title: 'Daily Average',
			value: data.statistics.averageSleepDurationByData,
		},
	];
};
