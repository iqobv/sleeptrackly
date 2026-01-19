import { PaginationLoader } from '@/components/UI';
import styles from './InventoryList.module.scss';
import InventoryListItemLoader from './InventoryListItem/InventoryListItemLoader';

const InventoryListLoader = () => {
	return (
		<div className={styles['inventory-list']}>
			<div className={styles['inventory-items']}>
				{Array.from({ length: 20 }).map((_, index) => (
					<InventoryListItemLoader key={index} />
				))}
			</div>
			<PaginationLoader />
		</div>
	);
};

export default InventoryListLoader;
