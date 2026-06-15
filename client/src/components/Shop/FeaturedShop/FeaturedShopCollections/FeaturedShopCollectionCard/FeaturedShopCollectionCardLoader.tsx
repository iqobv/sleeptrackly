import { SkeletonLoader } from '@shared/ui';
import styles from './FeaturedShopCollectionCard.module.scss';

export const FeaturedShopCollectionCardLoader = () => {
	return (
		<div className={styles.cardLoader}>
			<SkeletonLoader width="100%" height="100%" />
		</div>
	);
};
