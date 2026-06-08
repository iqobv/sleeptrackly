'use client';

import { Dashboard } from '@/types';
import { useTransformSecondsToHours } from '@shared/hooks';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import DashboardCard from '../DashboardCard/DashboardCard';
import styles from './DashboardWeekStats.module.scss';
import { DASHBOARD_WEEK_STATS_CARDS } from './dashboardWeekStatsCards';

dayjs.extend(duration);

interface DashboardWeekStatsProps {
	data: Dashboard;
}

const DashboardWeekStats = ({ data }: DashboardWeekStatsProps) => {
	const transform = useTransformSecondsToHours();

	return (
		<div className={styles.weekStats}>
			{DASHBOARD_WEEK_STATS_CARDS(data).map((card) => (
				<DashboardCard key={card.title} className={styles.card}>
					<h3 className={styles.title}>{card.title}</h3>
					<p className={styles.value}>{transform(card.value)}</p>
				</DashboardCard>
			))}
		</div>
	);
};

export default DashboardWeekStats;
