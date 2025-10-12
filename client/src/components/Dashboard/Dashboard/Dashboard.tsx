'use client';

import DashboardLoader from '../DashboardLoader/DashboardLoader';
import SleepChart from '../SleepChart/SleepChart';
import Stats from '../Stats/Stats';
import StatsByDays from '../StatsByDays/StatsByDays';
import WeekPagination from '../WeekPagination/WeekPagination';
import styles from './Dashboard.module.scss';
import { useDashboard } from './useDashboard';

const Dashboard = () => {
	const { showSkeleton, data } = useDashboard();

	return (
		<div className={styles['dashboard']}>
			{showSkeleton ? (
				<DashboardLoader />
			) : (
				data && (
					<>
						<WeekPagination totalWeeks={data?.totalWeeks} days={data?.days} />
						<Stats data={data.statistics} />
						<SleepChart data={data.days} />
						<StatsByDays days={data.days} />
					</>
				)
			)}
		</div>
	);
};

export default Dashboard;
