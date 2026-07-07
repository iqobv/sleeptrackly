'use client';

import { Dashboard } from '@/types/dashboard/dashboard.types';
import { transformSecondsToHours } from '@shared/utils';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { DashboardCard } from '../DashboardCard/DashboardCard';
import styles from './DashboardWeekStats.module.scss';
import { DASHBOARD_WEEK_STATS_CARDS } from './dashboardWeekStatsCards';

dayjs.extend(duration);

interface DashboardWeekStatsProps {
	data: Dashboard;
}

export const DashboardWeekStats = ({ data }: DashboardWeekStatsProps) => {
	return (
		<div className={styles.weekStats}>
			{DASHBOARD_WEEK_STATS_CARDS(data).map((card) => (
				<DashboardCard key={card.title} className={styles.card}>
					<h3 className={styles.title}>{card.title}</h3>
					<p className={styles.value}>{transformSecondsToHours(card.value)}</p>
				</DashboardCard>
			))}
		</div>
	);
};
