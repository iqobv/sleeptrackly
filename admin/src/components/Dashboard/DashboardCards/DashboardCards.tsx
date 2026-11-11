'use client';

import { Dashboard } from '@/types/dashboard/dashboard.types';
import { DashboardCard } from '../DashboardCard/DashboardCard';
import { GlobalDashboardCard } from '../DashboardCard/GlobalDashboardCard';
import styles from './DashboardCards.module.scss';
import {
	DASHBOARD_METRIC_ITEMS,
	DashboardMetricItem,
} from './dashboardMetricItems';

interface DashboardCardsProps {
	data: Dashboard;
}

export const DashboardCards = ({ data }: DashboardCardsProps) => {
	const cards: DashboardMetricItem[] = DASHBOARD_METRIC_ITEMS.map((item) => ({
		...item,
		data: data[item.key],
	}));

	return (
		<div className={styles.cards}>
			{cards.map(({ key, ...rest }) => (
				<DashboardCard key={key} {...rest} />
			))}
			<GlobalDashboardCard
				title="Total Registed Users"
				value={data.totalRegisteredUsersCount}
			/>
		</div>
	);
};
