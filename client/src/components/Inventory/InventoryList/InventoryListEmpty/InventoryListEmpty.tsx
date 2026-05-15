'use client';

import { Button } from '@/components/UI';
import { PRIVATE_PAGES } from '@/config';
import styles from './InventoryListEmpty.module.scss';

const InventoryListEmpty = () => {
	return (
		<div className={styles['inventory-list-empty']}>
			<p>Your inventory is empty. You can buy items in the shop.</p>
			<Button href={PRIVATE_PAGES.SHOP.CATALOG}>To Shop</Button>
		</div>
	);
};

export default InventoryListEmpty;
