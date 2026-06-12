import { SkeletonLoader } from '@shared/ui';
import styles from './FeaturedShop.module.scss';
import { FeaturedShopBannerLoader } from './FeaturedShopBanner/FeaturedShopBannerLoader';
import { FeaturedShopCarouselLoader } from './FeaturedShopCarousel/FeaturedShopCarouselLoader';
import { FeaturedShopSectionsLoader } from './FeaturedShopSections/FeaturedShopSectionsLoader';

export const FeaturedShopLoader = () => (
	<div className={styles.featuredShop}>
		<div>
			<SkeletonLoader height={40} width={250} style={{ margin: '1.25rem 0' }} />
			<FeaturedShopCarouselLoader />
		</div>
		<FeaturedShopBannerLoader />
		<SkeletonLoader height={30} width={250} style={{ marginTop: '1.25rem' }} />
		<FeaturedShopSectionsLoader />
	</div>
);
