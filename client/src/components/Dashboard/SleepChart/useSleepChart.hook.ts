'use client';

import { DashboardDay } from '@/types/dashboard/dashboard.types';
import { appDayjs, transformSecondsToHours } from '@shared/utils';
import { useMemo } from 'react';

interface ChartData {
	day: string;
	chartValue: number;
	tooltipValue: string;
	tooltipLabel: string;
}

export const useSleepChart = (data: DashboardDay[]) => {
	const labels = useMemo(
		() => data?.map((item) => appDayjs(item.day).format('ddd')),
		[data],
	);

	const chartData: ChartData[] = data.map((dayData, index) => {
		return {
			day: labels[index],
			chartValue: dayData.data
				? Number((dayData.sleepDuration / 60 / 60).toFixed(1))
				: 0,
			tooltipValue: transformSecondsToHours(dayData.sleepDuration || 0),
			tooltipLabel: appDayjs(dayData.day).format('dddd'),
		};
	});

	return chartData;
};
