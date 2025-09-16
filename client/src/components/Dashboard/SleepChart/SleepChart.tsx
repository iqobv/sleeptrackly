'use client';

import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import {
	Area,
	AreaChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import styles from './SleepChart.module.scss';

interface SleepChartProps {
	data: any[];
}

interface ChartData {
	name: string;
	time: number;
}

const SleepChart = ({ data }: SleepChartProps) => {
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

	return (
		<div className={styles['sleep-chart']}>
			<div className={styles['sleep-chart-title-container']}>
				<p className={styles['sleep-chart-title']}>Sleep duration</p>
				<p className={styles['sleep-chart-subtitle']}>
					{sleepDuration.toFixed(1)} hours
				</p>
			</div>
			<div className={styles['chart-wrapper']}>
				<ResponsiveContainer width="100%" height="100%">
					<AreaChart
						width={500}
						height={400}
						data={chartData}
						margin={{
							top: 10,
							right: 30,
							left: -10,
							bottom: 0,
						}}
					>
						<XAxis dataKey="name" strokeOpacity={0} />
						<YAxis strokeOpacity={0} />
						<Tooltip
							formatter={(value) => [`${value}h`, null]}
							contentStyle={{ backgroundColor: '#20262D' }}
						/>
						<Area
							type="monotone"
							dataKey="time"
							stroke="var(--chart-stroke)"
							strokeWidth={5}
							fill="var(--chart-bg)"
						/>
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default SleepChart;
