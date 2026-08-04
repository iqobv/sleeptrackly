import { SkeletonLoader } from '@shared/ui';
import styles from './TaskSummary.module.scss';

export const TaskSummaryLoader = () => (
	<div className={styles.summary}>
		<div className={styles.header}>
			<SkeletonLoader width="80%" height={33} />
			<SkeletonLoader width="100%" height={24} />
		</div>
		<div className={styles.itemLoader}>
			<SkeletonLoader width="100%" height="100%" />
		</div>
	</div>
);
