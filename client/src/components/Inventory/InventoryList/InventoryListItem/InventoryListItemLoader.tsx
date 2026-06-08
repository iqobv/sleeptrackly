import { SkeletonLoader } from '@shared/ui';

import styles from './InventoryListItem.module.scss';

export const InventoryListItemLoader = () => {
	return <SkeletonLoader className={styles.item} />;
};
