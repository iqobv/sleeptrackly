'use client';

import { getDashboard } from '@/api/dashboard/dashboard.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDashboardParams } from './useDashboardParams.hook';

export const useDashboard = () => {
	const [params] = useDashboardParams();

	return useQuery({
		queryKey: QUERY_KEYS.dashboard.byDate(params.date),
		queryFn: () => getDashboard(params),
		placeholderData: keepPreviousData,
	});
};
