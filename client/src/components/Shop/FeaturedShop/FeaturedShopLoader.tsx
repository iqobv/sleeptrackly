import { SectionHeaderLoader } from '@shared/ui';
import styles from './FeaturedShop.module.scss';
import { FeaturedShopBannerLoader } from './FeaturedShopBanner/FeaturedShopBannerLoader';
import { FeaturedShopCarouselLoader } from './FeaturedShopCarousel/FeaturedShopCarouselLoader';
import { FeaturedShopCollectionsLoader } from './FeaturedShopCollections/FeaturedShopCollectionsLoader';
import { FeaturedShopSectionsLoader } from './FeaturedShopSections/FeaturedShopSectionsLoader';

export const FeaturedShopLoader = () => (
	<div className={styles.featuredShop}>
		<div>
			<SectionHeaderLoader titleHeight={40} titleWidth={220} />
			<FeaturedShopCarouselLoader />
		</div>
		<FeaturedShopCollectionsLoader />
		<FeaturedShopBannerLoader />
		<SectionHeaderLoader titleHeight={30} titleWidth={220} />
		<FeaturedShopSectionsLoader />
	</div>
);
