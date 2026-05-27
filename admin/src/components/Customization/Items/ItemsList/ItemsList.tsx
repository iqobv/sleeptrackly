'use client';

import { getAllItems } from '@/api';
import { Button } from '@/components/UI';
import { PAGES, QUERY_KEYS } from '@/config';
import { Item } from '@/types';
import Link from 'next/link';
import ItemCard from '../../ItemCard/ItemCard';
import ItemsListPaginatedWrapper from '../../ItemsListPaginatedWrapper/ItemsListPaginatedWrapper';
import styles from './ItemsList.module.scss';

const ItemsList = () => {
	return (
		<div className={styles.items}>
			<Button asChild>
				<Link href={PAGES.ITEM_NEW} prefetch={false}>
					New Item
				</Link>
			</Button>
			<ItemsListPaginatedWrapper<Item>
				queryFn={getAllItems}
				queryKey={(params) => [...QUERY_KEYS.customization.item.getAll(params)]}
				itemCard={(item) => (
					<ItemCard
						item={item}
						actions={
							<Button fullWidth variant="contained" color="secondary" asChild>
								<Link href={PAGES.ITEM(item.id)} prefetch={false}>
									View
								</Link>
							</Button>
						}
					/>
				)}
			/>
		</div>
	);
};

export default ItemsList;
