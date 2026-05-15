import { Button } from '@/components/UI';
import { PRIVATE_PAGES } from '@/config';
import styles from './FeaturedShopBanner.module.scss';

const FeaturedShopBanner = () => {
	return (
		<div className={styles['featured-shop-banner']}>
			<p className={styles['featured-shop-banner__text']}>
				Explore all customization items!
			</p>
			<Button href={PRIVATE_PAGES.SHOP.CATALOG} size="lg">
				Browse All
			</Button>
		</div>
	);
};

export default FeaturedShopBanner;
