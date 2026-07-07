'use client';

import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { useDashboardParams } from '../Dashboard/useDashboardParams.hook';

dayjs.extend(isoWeek);

export const useWeekPagination = () => {
	const [params, setParams] = useDashboardParams();

	const handleWeekChange = (newDate: string) => setParams({ date: newDate });

	return {
		date: params.date,
		handleWeekChange,
	};
};
