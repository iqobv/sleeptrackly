import { SkeletonLoader } from '@/components/UI';
import styles from './FeaturedShopCarousel.module.scss';

export const FeaturedShopCarouselLoader = () => (
	<div className={styles.shopCarousel}>
		<SkeletonLoader width="100%" height="100%" />
	</div>
);
