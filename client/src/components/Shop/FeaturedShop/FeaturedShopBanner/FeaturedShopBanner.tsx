import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { Button } from '@shared/ui';
import Link from 'next/link';
import styles from './FeaturedShopBanner.module.scss';

export const FeaturedShopBanner = () => {
	return (
		<div className={styles.banner}>
			<p className={styles.text}>Explore all customization items!</p>
			<Button size="lg" asChild>
				<Link href={PRIVATE_PAGES.SHOP.CATALOG}>Browse All</Link>
			</Button>
		</div>
	);
};
