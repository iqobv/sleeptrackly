import { SkeletonLoader } from '@/components/UI';
import styles from './SleepChart.module.scss';

const SleepChartLoader = () => {
	return (
		<div className={styles['sleep-chart__wrapper']} style={{ padding: 0 }}>
			<SkeletonLoader
				height="100%"
				borderRadius="var(--dashboard-card-border-radius)"
			/>
		</div>
	);
};

export default SleepChartLoader;
