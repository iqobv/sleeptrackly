'use client';

import { DashboardDay } from '@/types';
import {
	Bar,
	BarChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import DashboardCard from '../DashboardCard/DashboardCard';
import styles from './SleepChart.module.scss';
import { useSleepChart } from './useSleepChart.hook';

interface SleepChartProps {
	data: DashboardDay[];
}

const SleepChart = ({ data }: SleepChartProps) => {
	const chartData = useSleepChart(data);

	return (
		<DashboardCard className={styles.wrapper}>
			<ResponsiveContainer
				width="100%"
				height="100%"
				minWidth={1}
				minHeight={1}
				initialDimension={{ width: 100, height: 50 }}
				className={styles.container}
			>
				<BarChart
					width={500}
					height={400}
					data={chartData}
					margin={{
						top: 10,
						right: 20,
						left: -20,
						bottom: -10,
					}}
				>
					<XAxis dataKey="day" strokeOpacity={0} />
					<YAxis strokeOpacity={0} />
					<Tooltip
						formatter={(_value, _name, entry) => [
							entry.payload.tooltipValue,
							null,
						]}
						cursor={false}
						labelFormatter={(_label, payload) =>
							payload?.[0]?.payload?.tooltipLabel ?? ''
						}
						contentStyle={{
							backgroundColor: 'var(--chart-tooltip-bg)',
							border: '1px solid var(--chart-tooltip-border)',
							textAlign: 'center',
							minWidth: '70px',
							borderRadius: '4px',
						}}
					/>
					<Bar
						dataKey="chartValue"
						fill="var(--dashboard-chart-bar-bg)"
						activeBar={{
							fill: 'var(--dashboard-chart-bar-bg-hover)',
							stroke: 'var(--dashboard-chart-bar-border-hover)',
						}}
						radius={20}
					/>
				</BarChart>
			</ResponsiveContainer>
		</DashboardCard>
	);
};

export default SleepChart;
