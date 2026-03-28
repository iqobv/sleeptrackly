import { SkeletonLoader } from '@/components/UI';
import styles from './FeaturedShopSections.module.scss';

const CARDS_LOADERS = Array.from({ length: 5 }, (_, index) => (
	<SkeletonLoader key={index} height={320} />
));

const FeaturedShopSectionLoader = () => {
	return (
		<div className={styles['featured-shop-sections__section']}>
			<div className={styles['featured-shop-sections__header']}>
				<SkeletonLoader width={180} height={32} />
				<SkeletonLoader width={90} height={32} />
			</div>
			<div className={styles['featured-shop-sections__items']}>
				{CARDS_LOADERS}
			</div>
		</div>
	);
};

export default FeaturedShopSectionLoader;
