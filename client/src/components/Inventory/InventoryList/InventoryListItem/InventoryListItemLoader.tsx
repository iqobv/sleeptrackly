import { SkeletonLoader } from '@/components/UI';

import styles from './InventoryListItem.module.scss';

const InventoryListItemLoader = () => {
	return <SkeletonLoader className={styles.item} />;
};

export default InventoryListItemLoader;
