import { SkeletonLoader } from '@shared/ui';
import styles from './WeeklySummary.module.scss';

export const WeeklySummaryLoader = () => {
	return (
		<div className={styles.cards}>
			{Array.from({ length: 6 }).map((_, i) => (
				<SkeletonLoader key={i} height={110} />
			))}
		</div>
	);
};
