import { Button } from '@/components/UI';
import { PRIVATE_PAGES } from '@/config';
import Link from 'next/link';
import styles from './FeaturedShopBanner.module.scss';

const FeaturedShopBanner = () => {
	return (
		<div className={styles['featured-shop-banner']}>
			<p className={styles['featured-shop-banner__text']}>
				Explore all customization items!
			</p>
			<Button size="lg" asChild>
				<Link href={PRIVATE_PAGES.SHOP.CATALOG}>Browse All</Link>
			</Button>
		</div>
	);
};

export default FeaturedShopBanner;
