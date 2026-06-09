import { SkeletonLoader } from '@shared/ui';
import { TaskSummaryLoader } from '../TaskSummary';
import styles from './Calendar.module.scss';

export const CalendarLoader = () => (
	<div className={styles.calendar}>
		<div className={styles.container}>
			<div className={styles.header}>
				<SkeletonLoader height="2.75rem" width="2.75rem" />
				<SkeletonLoader height="2.75rem" width="5.4375rem" />
				<SkeletonLoader height="2.75rem" width="2.75rem" />
			</div>
			<SkeletonLoader height="15.6875rem" width="19.25rem" />
		</div>
		<TaskSummaryLoader />
	</div>
);
