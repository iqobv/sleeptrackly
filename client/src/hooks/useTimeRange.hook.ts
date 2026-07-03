'use client';

import { formatTimeRange, type IsoDate } from '@/utils/dateFomatter.util';
import { useCallback } from 'react';

interface TimeRange {
	start: string;
	end: string;
}

export const useTimeRange = () => {
	const getRange = useCallback((start: IsoDate, end: IsoDate): TimeRange => {
		const [startTime, endTime] = formatTimeRange(start, end);

		return {
			start: startTime,
			end: endTime,
		};
	}, []);

	return { getRange };
};
