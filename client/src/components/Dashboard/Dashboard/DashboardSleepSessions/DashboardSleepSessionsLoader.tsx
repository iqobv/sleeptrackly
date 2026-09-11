import { SectionHeaderLoader, SkeletonLoader } from '@shared/ui';
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

export const DashboardSleepSessionsLoader = () => {
	return (
		<div className={styles.sleepSessions}>
			<SectionHeaderLoader titleHeight={28} titleWidth={220} />
			<div className={styles.list}>{cards}</div>
		</div>
	);
};
