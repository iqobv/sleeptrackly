'use client';

import { SectionHeader } from '@shared/ui';
import DashboardWeekStats from '../DashboardWeekStats/DashboardWeekStats';
import SleepChart from '../SleepChart/SleepChart';
import WeekPagination from '../WeekPagination/WeekPagination';
import styles from './Dashboard.module.scss';
import DashboardLoader from './DashboardLoader';
import DashboardSleepSessions from './DashboardSleepSessions/DashboardSleepSessions';
import { useDashboard } from './useDashboard';

const Dashboard = () => {
	const { showSkeleton, data } = useDashboard();

	return (
		<div className={styles.dashboard}>
			<SectionHeader title="Weekly Rest" containerClassName={styles.header} />
			{showSkeleton ? (
				<DashboardLoader />
			) : (
				data && (
					<div className={`${styles.wrapper} fade-in`}>
						<WeekPagination hasMore={data.hasMore} days={data.days} />
						<div className={styles.content}>
							<DashboardWeekStats data={data} />
							<SleepChart data={data.days} />
						</div>
						<DashboardSleepSessions days={data.days} />
					</div>
				)
			)}
		</div>
	);
};

export default Dashboard;
