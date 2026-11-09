'use client';

import { getDashboard } from '@/api/dashboard/getDashboard.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { useQuery } from '@tanstack/react-query';
import { DashboardCards } from './DashboardCards/DashboardCards';

const date = '2026-11-09';

export const Dashboard = () => {
	const { data, isLoading } = useQuery({
		queryFn: () => getDashboard(date),
		queryKey: QUERY_KEYS.dashboard.date(date),
	});

	if (!data || isLoading) return null;

	return (
		<div>
			<DashboardCards data={data} />
		</div>
	);
};
