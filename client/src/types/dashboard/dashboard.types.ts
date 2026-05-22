import { DashboardDay } from './dashboardDay.types';
import { Statistics } from './statistics.types';

export interface Dashboard {
	statistics: Statistics;
	days: DashboardDay[];
	hasMore: boolean;
}
