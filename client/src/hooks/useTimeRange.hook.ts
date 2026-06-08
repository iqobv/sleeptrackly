'use client';

import { useFormatLocaleTime } from '@shared/hooks';

type DateType = string | Date;

interface UseTimeRangeReturn {
	raw: {
		start: string;
		end: string;
	};
	formatted: string;
}

export const useTimeRange = (
	startDate: DateType,
	endDate: DateType,
): UseTimeRangeReturn => {
	const formatTime = useFormatLocaleTime();

	const startTime = formatTime(startDate);
	const endTime = formatTime(endDate);

	return {
		raw: {
			start: startTime,
			end: endTime,
		},
		formatted: `${startTime} - ${endTime}`,
	};
};
