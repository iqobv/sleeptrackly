import { SkeletonLoader } from '@shared/ui';
import styles from './PromotionsList.module.scss';

export const PromotionsListLoader = () => (
	<div className={styles.list}>
		{Array.from({ length: 10 }, (_, i) => (
			<SkeletonLoader key={i} height={40} />
		))}
	</div>
);
