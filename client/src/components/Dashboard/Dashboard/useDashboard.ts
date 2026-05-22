'use client';

import { getStatisticsByWeekForUser } from '@/api';
import { QUERY_KEYS } from '@/config';
import { useAuth } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useWeekPagination } from '../WeekPagination/useWeekPagination.hook';

export const useDashboard = () => {
	const [showSkeleton, setShowSkeleton] = useState(true);

	const { isAuthenticated, user } = useAuth();
	const { date } = useWeekPagination();

	const { data, isLoading, isFetching } = useQuery({
		queryKey: QUERY_KEYS.dashboard.all(user?.id || '', date),
		queryFn: () => getStatisticsByWeekForUser({ date }),
		enabled: !!isAuthenticated,
	});

	useEffect(() => {
		if (!isLoading && !isFetching && data) {
			setShowSkeleton(false);
		} else {
			setShowSkeleton(true);
		}
	}, [isLoading, isFetching, data]);

	return {
		data,
		showSkeleton,
	};
};
