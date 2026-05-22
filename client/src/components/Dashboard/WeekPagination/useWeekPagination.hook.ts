'use client';

import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { parseAsString, useQueryState } from 'nuqs';

dayjs.extend(isoWeek);

export const useWeekPagination = () => {
	const [date, setDate] = useQueryState(
		'date',
		parseAsString.withDefault(dayjs().startOf('isoWeek').format('YYYY-MM-DD')),
	);

	const handleWeekChange = (newDate: string) => {
		setDate(newDate);
	};

	return {
		date,
		handleWeekChange,
	};
};
