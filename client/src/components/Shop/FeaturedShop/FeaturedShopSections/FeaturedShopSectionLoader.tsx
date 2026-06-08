import { SkeletonLoader } from '@shared/ui';
import styles from './FeaturedShopSections.module.scss';

const CARDS_LOADERS = Array.from({ length: 5 }, (_, index) => (
	<SkeletonLoader key={index} height={320} />
));

export const FeaturedShopSectionLoader = () => {
	return (
		<div className={styles.section}>
			<div className={styles.header}>
				<SkeletonLoader width={180} height={32} />
				<SkeletonLoader width={90} height={32} />
			</div>
			<div className={styles.items}>{CARDS_LOADERS}</div>
		</div>
	);
};
