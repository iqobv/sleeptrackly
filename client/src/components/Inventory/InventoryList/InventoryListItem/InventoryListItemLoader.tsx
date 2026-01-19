import { SkeletonLoader } from '@/components/UI';

import styles from './InventoryListItem.module.scss';

const InventoryListItemLoader = () => {
	return <SkeletonLoader className={styles['inventory-item']} />;
};

export default InventoryListItemLoader;
