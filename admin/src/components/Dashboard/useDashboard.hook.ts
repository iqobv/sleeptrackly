'use client';

import { getDashboard } from '@/api/dashboard/getDashboard.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDashboardQuery } from './useDashboardQuery.hook';

export const useDashboard = () => {
	const [params] = useDashboardQuery();

	return useQuery({
		queryKey: QUERY_KEYS.dashboard.filter(params),
		queryFn: () => getDashboard(params),
		placeholderData: keepPreviousData,
	});
};
