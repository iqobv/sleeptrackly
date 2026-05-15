'use client';

import { getAllItems } from '@/api';
import { Button } from '@/components/UI';
import { PAGES, QUERY_KEYS } from '@/config';
import { Item } from '@/types';
import ItemCard from '../../ItemCard/ItemCard';
import ItemsListPaginatedWrapper from '../../ItemsListPaginatedWrapper/ItemsListPaginatedWrapper';
import styles from './ItemsList.module.scss';

const ItemsList = () => {
	return (
		<div className={styles['items']}>
			<Button href={PAGES.ITEM_NEW}>New Item</Button>
			<ItemsListPaginatedWrapper<Item>
				queryFn={getAllItems}
				queryKey={(params) => [...QUERY_KEYS.customization.item.getAll(params)]}
				itemCard={(item) => (
					<ItemCard
						item={item}
						actions={
							<Button fullWidth variant="secondary" href={PAGES.ITEM(item.id)}>
								View
							</Button>
						}
					/>
				)}
			/>
		</div>
	);
};

export default ItemsList;
