'use client';

import { useDashboardParams } from '../Dashboard/useDashboardParams.hook';

export const useWeekPagination = () => {
	const [params, setParams] = useDashboardParams();

	const handleWeekChange = (newDate: string) => setParams({ date: newDate });

	return {
		date: params.date,
		handleWeekChange,
	};
};
