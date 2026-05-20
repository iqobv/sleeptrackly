import { SkeletonLoader } from '../UI';
import styles from './WeeklySummary.module.scss';

const WeeklySummaryLoader = () => {
	return (
		<div className={styles.cards}>
			{new Array(6).map((_, i) => (
				<SkeletonLoader key={i} height={110} />
			))}
		</div>
	);
};

export default WeeklySummaryLoader;
