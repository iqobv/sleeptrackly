import { SkeletonLoader } from '@shared/ui';
import styles from './ChallengeInfo.module.scss';

export const ChallengeInfoLoader = () => (
	<div className={styles.info}>
		<div className={styles.table}>
			{Array.from({ length: 5 }).map((_, i) => (
				<SkeletonLoader key={i} height="2.0625rem" width="100%" />
			))}
		</div>
	</div>
);
