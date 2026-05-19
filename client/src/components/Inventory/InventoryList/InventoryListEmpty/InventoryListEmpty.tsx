'use client';

import { Button } from '@/components/UI';
import { PRIVATE_PAGES } from '@/config';
import Link from 'next/link';
import styles from './InventoryListEmpty.module.scss';

const InventoryListEmpty = () => {
	return (
		<div className={styles.empty}>
			<p>Your inventory is empty. You can buy items in the shop.</p>
			<Button asChild>
				<Link href={PRIVATE_PAGES.SHOP.CATALOG}>To Shop</Link>
			</Button>
		</div>
	);
};

export default InventoryListEmpty;
