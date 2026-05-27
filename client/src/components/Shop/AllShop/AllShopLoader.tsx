import { SkeletonLoader } from '@/components/UI';
import styles from './AllShop.module.scss';
import AllShopFilterLoader from './AllShopFilter/AllShopFilterLoader';
import AllShopFilterSearchBarLoader from './AllShopFilterSearchBar/AllShopFilterSearchBarLoader';

const ITEMS = Array.from({ length: 20 }).map((_, i) => (
	<SkeletonLoader key={i} height={316} />
));

const AllShopLoader = () => {
	return (
		<div className={styles['all-shop__content']}>
			<AllShopFilterLoader />
			<div className={styles['all-shop__items-container']}>
				<AllShopFilterSearchBarLoader />
				<div className={styles['all-shop__items']}>
					<div className={styles.itemsGrid}>{ITEMS}</div>
					<div style={{ margin: '0 auto' }}>
						<SkeletonLoader width={250} height={44} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default AllShopLoader;
