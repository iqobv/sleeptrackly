import { SkeletonLoader } from '@/components/UI';
import styles from './AllShop.module.scss';
import { AllShopFilterLoader } from './AllShopFilter';
import { AllShopFilterSearchBarLoader } from './AllShopFilterSearchBar';

const ITEMS = Array.from({ length: 20 }).map((_, i) => (
	<SkeletonLoader key={i} height={316} />
));

export const AllShopItemsLoader = () => (
	<div className={styles.items}>
		<div className={styles.itemsGrid}>{ITEMS}</div>
		<div style={{ margin: '0 auto' }}>
			<SkeletonLoader width={250} height={44} />
		</div>
	</div>
);

export const AllShopLoader = () => (
	<div className={styles.content}>
		<AllShopFilterLoader />
		<div className={styles.itemsContainer}>
			<AllShopFilterSearchBarLoader />
			<AllShopItemsLoader />
		</div>
	</div>
);
