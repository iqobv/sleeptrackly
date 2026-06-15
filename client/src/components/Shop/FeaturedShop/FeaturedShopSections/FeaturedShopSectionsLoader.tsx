import { FeaturedShopSectionLoader } from './FeaturedShopSectionLoader';
import styles from './FeaturedShopSections.module.scss';
import { FEATURED_SHOP_SECTIONS_ITEMS } from './featuredShopSectionsItems';

const SECTION = Array.from({ length: FEATURED_SHOP_SECTIONS_ITEMS.length }).map(
	(_, index) => <FeaturedShopSectionLoader key={index} />,
);

export const FeaturedShopSectionsLoader = () => {
	return <div className={styles.sections}>{SECTION}</div>;
};
