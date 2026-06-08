'use client';

import { DashboardDay } from '@/types';
import { useTransformSecondsToHours } from '@shared/hooks';
import dayjs from 'dayjs';
import { useMemo } from 'react';

interface ChartData {
	day: string;
	chartValue: number;
	tooltipValue: string;
	tooltipLabel: string;
}

export const useSleepChart = (data: DashboardDay[]) => {
	const transform = useTransformSecondsToHours();

	const labels = useMemo(
		() => data?.map((item) => dayjs(item.day).format('ddd')),
		[data],
	);

	const chartData: ChartData[] = data.map((dayData, index) => {
		return {
			day: labels[index],
			chartValue: dayData.data
				? Number((dayData.data.sleepDuration / 60 / 60).toFixed(1))
				: 0,
			tooltipValue: transform(dayData.data?.sleepDuration || 0),
			tooltipLabel: dayjs(dayData.day).format('dddd'),
		};
	});

	return chartData;
};
