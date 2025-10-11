'use client';

import { IDashboardDay } from '@/types';
import {
	Area,
	AreaChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import styles from './SleepChart.module.scss';
import { useSleepChart } from './useSleepChart';

interface SleepChartProps {
	data: IDashboardDay[];
}

const SleepChart = ({ data }: SleepChartProps) => {
	const { sleepDuration, chartData } = useSleepChart(data);

	return (
		<div className={`${styles['sleep-chart']} fade-in`}>
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
							contentStyle={{
								backgroundColor: 'var(--chart-tooltip-bg)',
								border: '1px solid var(--chart-tooltip-border)',
								textAlign: 'center',
								minWidth: '70px',
								borderRadius: '4px',
							}}
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
