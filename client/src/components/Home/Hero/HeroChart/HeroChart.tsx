'use client';

import { HERO_CHART_DATA } from './chartData';
import styles from './HeroChart.module.scss';

export const HeroChart = () => {
	const maxHours = 10;
	const yAxis = [10, 8, 6, 4, 2, 0];

	return (
		<div className={styles.container}>
			<div className={styles.body}>
				<div className={styles.yAxis}>
					{yAxis.map((value) => (
						<span key={value} className={styles.yAxisLabel}>
							{value}
						</span>
					))}
				</div>
				<div className={styles.chart}>
					<div className={styles.bars}>
						{HERO_CHART_DATA.map(({ day, value }) => (
							<div className={styles.barContainer} key={`bar-${day}`}>
								<div
									className={styles.bar}
									style={{
										height: `${(value / maxHours) * 100}%`,
									}}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className={styles.xAxis}>
				<div className={styles.xAxisLabels}>
					{HERO_CHART_DATA.map(({ day }) => (
						<div key={`label-${day}`} className={styles.xAxisLabel}>
							{day.charAt(0)}
							<span className={styles.fullLabel}>{day.slice(1)}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
