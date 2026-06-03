import { SkeletonLoader } from '@/components/UI';

import styles from './InventoryListItem.module.scss';

export const InventoryListItemLoader = () => {
	return <SkeletonLoader className={styles.item} />;
};
