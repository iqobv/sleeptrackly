import { SkeletonLoader } from '@shared/ui';
import styles from './DashboardWeekStats.module.scss';

const cards = Array.from({ length: 2 }).map((_, i) => (
	<SkeletonLoader
		key={i}
		height="100%"
		borderRadius="var(--dashboard-card-border-radius)"
		style={{ minHeight: '6.875rem' }}
	/>
));

export const DashboardWeekStatsLoader = () => (
	<div className={styles.weekStats}>{cards}</div>
);
