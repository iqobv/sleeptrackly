import { SectionHeaderLoader } from '@shared/ui';
import { DashboardWeekStatsLoader } from '../DashboardWeekStats/DashboardWeekStatsLoader';
import { SleepChartLoader } from '../SleepChart/SleepChartLoader';
import { WeekPaginationLoader } from '../WeekPagination/WeekPaginationLoader';
import styles from './Dashboard.module.scss';
import { DashboardSleepSessionsLoader } from './DashboardSleepSessions/DashboardSleepSessionsLoader';

export const DashboardLoader = () => {
	return (
		<div className={styles.wrapper}>
			<WeekPaginationLoader />
			<div className={styles.content}>
				<DashboardWeekStatsLoader />
				<SleepChartLoader />
			</div>
			<DashboardSleepSessionsLoader />
		</div>
	);
};

export const DashboardPageLoader = () => (
	<div className={styles.dashboard}>
		<SectionHeaderLoader titleWidth={200} />
		<DashboardLoader />
	</div>
);
