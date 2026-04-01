'use client';

import { useTransformSecondsToHours } from '@/hooks';
import { IDashboard } from '@/types';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import DashboardCard from '../DashboardCard/DashboardCard';
import styles from './DashboardWeekStats.module.scss';
import { DASHBOARD_WEEK_STATS_CARDS } from './dashboardWeekStatsCards';

dayjs.extend(duration);

interface DashboardWeekStatsProps {
	data: IDashboard;
}

const DashboardWeekStats = ({ data }: DashboardWeekStatsProps) => {
	const transform = useTransformSecondsToHours();

	return (
		<div className={styles['dashboard-week-stats']}>
			{DASHBOARD_WEEK_STATS_CARDS(data).map((card) => (
				<DashboardCard
					key={card.title}
					className={styles['dashboard-week-stats__card']}
				>
					<h3 className={styles['dashboard-week-stats__card-title']}>
						{card.title}
					</h3>
					<p className={styles['dashboard-week-stats__card-value']}>
						{transform(card.value)}
					</p>
				</DashboardCard>
			))}
		</div>
	);
};

export default DashboardWeekStats;
