import { SkeletonLoader } from '@shared/ui';
import styles from './ChallengeSummary.module.scss';

export const ChallengeSummaryLoader = () => (
	<div className={styles.summary}>
		<div className={styles.header}>
			<SkeletonLoader width={160} height={38} />
			<SkeletonLoader width={120} height={24} />
		</div>
		<div className={styles.buttons}>
			<div className={styles.button}>
				<SkeletonLoader width="100%" height="100%" />
			</div>
			<div className={styles.button}>
				<SkeletonLoader width="100%" height="100%" />
			</div>
		</div>
	</div>
);
