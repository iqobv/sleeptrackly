'use client';

import DashboardLoader from '../DashboardLoader/DashboardLoader';
import SleepChart from '../SleepChart/SleepChart';
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
					<div className={`${styles['dashboard__wrapper']} fade-in`}>
						<WeekPagination totalWeeks={data?.totalWeeks} days={data?.days} />
						<SleepChart data={data.days} />
						<StatsByDays days={data.days} />
					</div>
				)
			)}
		</div>
	);
};

export default Dashboard;
