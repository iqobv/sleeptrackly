import { PaginationLoader } from '@/components/UI';
import styles from './InventoryList.module.scss';
import { InventoryListItemLoader } from './InventoryListItem';

export const InventoryListLoader = () => {
	return (
		<div className={styles.inventory}>
			<div className={styles.list}>
				{Array.from({ length: 20 }).map((_, index) => (
					<InventoryListItemLoader key={index} />
				))}
			</div>
			<PaginationLoader />
		</div>
	);
};
