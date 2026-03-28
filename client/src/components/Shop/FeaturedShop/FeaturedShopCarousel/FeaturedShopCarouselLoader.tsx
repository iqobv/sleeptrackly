import { SkeletonLoader } from '@/components/UI';
import styles from './FeaturedShopCarousel.module.scss';

const FeaturedShopCarouselLoader = () => {
	return (
		<div className={styles['featured-shop-carousel']}>
			<SkeletonLoader width="100%" height="100%" />
		</div>
	);
};

export default FeaturedShopCarouselLoader;
