import { Button } from '@/components/UI';
import { PAGES } from '@/config';
import styles from './FeaturedShopBanner.module.scss';

const FeaturedShopBanner = () => {
	return (
		<div className={styles['featured-shop-banner']}>
			<p className={styles['featured-shop-banner__text']}>
				Explore all customization items!
			</p>
			<Button href={PAGES.SHOP_CATALOG} size="lg">
				Browse All
			</Button>
		</div>
	);
};

export default FeaturedShopBanner;
