'use client';

import { IDashboardDay } from '@/types';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

interface ChartData {
	name: string;
	time: number;
}

export const useSleepChart = (data: IDashboardDay[]) => {
	const [sleepDuration, setSleepDuration] = useState<number>(0);

	const durations = data?.map((item) =>
		item.data ? Number((item.data.sleepDuration / 60 / 60).toFixed(1)) : 0
	);
	const labels = data?.map((item) => dayjs(item.day).format('ddd'));

	const chartData: ChartData[] = data?.map((item, index) => ({
		name: labels[index],
		time: durations[index],
	}));

	useEffect(() => {
		if (durations) setSleepDuration(durations.reduce((a, b) => a + b, 0));
	}, [durations]);

	return { chartData, sleepDuration };
};
