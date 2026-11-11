'use client';

import styles from './Dashboard.module.scss';
import { DashboardCards } from './DashboardCards/DashboardCards';
import { DashboardLoader } from './DashboardLoader';
import { DashboardPagination } from './DashboardPagination/DashboardPagination';
import { useDashboard } from './useDashboard.hook';

export const Dashboard = () => {
	const { data, isLoading } = useDashboard();

	if (!data || isLoading) return <DashboardLoader />;

	return (
		<div className={styles.container}>
			<DashboardPagination hasPreviousWeek={data.hasPreviousWeekData} />
			<DashboardCards data={data} />
		</div>
	);
};
