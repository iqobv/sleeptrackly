import { SkeletonLoader } from '@shared/ui';
import styles from './SleepChart.module.scss';

export const SleepChartLoader = () => {
	return (
		<div className={styles.wrapper} style={{ padding: 0 }}>
			<SkeletonLoader
				height="100%"
				borderRadius="var(--dashboard-card-border-radius)"
			/>
		</div>
	);
};
