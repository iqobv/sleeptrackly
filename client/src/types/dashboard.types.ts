import { IDashboardDay } from './dashboardDay.types';
import { IStatistics } from './statistics.types';

export interface IDashboard {
	statistics: IStatistics;
	days: IDashboardDay[];
	totalWeeks: number;
}
