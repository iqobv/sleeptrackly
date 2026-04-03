import DashboardWeekStatsLoader from '../DashboardWeekStats/DashboardWeekStatsLoader';
import SleepChartLoader from '../SleepChart/SleepChartLoader';
import WeekPaginationLoader from '../WeekPagination/WeekPaginationLoader';
import styles from './Dashboard.module.scss';
import DashboardSleepSessionsLoader from './DashboardSleepSessions/DashboardSleepSessionsLoader';

const DashboardLoader = () => {
	return (
		<div className={styles['dashboard__wrapper']}>
			<WeekPaginationLoader />
			<div className={styles['dashboard__content']}>
				<DashboardWeekStatsLoader />
				<SleepChartLoader />
			</div>
			<DashboardSleepSessionsLoader />
		</div>
	);
};

export default DashboardLoader;
