'use client';

import { useDashboardQuery } from '../useDashboardQuery.hook';

export const useWeekPagination = () => {
	const [params, setParams] = useDashboardQuery();

	const handleWeekChange = (newDate: string) => setParams({ date: newDate });

	return {
		date: params.date,
		handleWeekChange,
	};
};
