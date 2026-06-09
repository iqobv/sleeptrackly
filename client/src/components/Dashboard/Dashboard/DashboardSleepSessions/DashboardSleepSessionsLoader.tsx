import { SkeletonLoader } from '@shared/ui';
import styles from './DashboardSleepSessions.module.scss';

const borderRadius = 'var(--dashboard-card-border-radius)';

const cards = Array.from({ length: 7 }).map((_, i) => (
	<SkeletonLoader
		key={i}
		borderRadius={borderRadius}
		height={85}
		className={styles.sleepSession}
	/>
));

const DashboardSleepSessionsLoader = () => {
	return (
		<div className={styles.sleepSessions}>
			<div style={{ padding: '1.25rem 0' }}>
				<SkeletonLoader width={220} height={28} borderRadius={borderRadius} />
			</div>
			<div className={styles.list}>{cards}</div>
		</div>
	);
};

export default DashboardSleepSessionsLoader;
