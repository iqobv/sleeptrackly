import { SkeletonLoader } from '@/components/UI';
import styles from './FeaturedShop.module.scss';
import FeaturedShopBannerLoader from './FeaturedShopBanner/FeaturedShopBannerLoader';
import FeaturedShopCarouselLoader from './FeaturedShopCarousel/FeaturedShopCarouselLoader';
import FeaturedShopSectionsLoader from './FeaturedShopSections/FeaturedShopSectionsLoader';

const FeaturedShopLoader = () => {
	return (
		<div className={styles['featured-shop']}>
			<div>
				<SkeletonLoader
					height={40}
					width={250}
					style={{ margin: '1.25rem 0' }}
				/>
				<FeaturedShopCarouselLoader />
			</div>
			<FeaturedShopBannerLoader />
			<SkeletonLoader
				height={30}
				width={250}
				style={{ marginTop: '1.25rem' }}
			/>
			<FeaturedShopSectionsLoader />
		</div>
	);
};

export default FeaturedShopLoader;
