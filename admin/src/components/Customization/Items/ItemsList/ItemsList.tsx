'use client';

import { getAllItems } from '@/api';
import { PAGES, QUERY_KEYS } from '@/config';
import { Item } from '@/types';
import { Button } from '@shared/ui';
import Link from 'next/link';
import { CustomizationPageHeader } from '../../CustomizationPageHeader';
import ItemCard from '../../ItemCard/ItemCard';
import ItemsListPaginatedWrapper from '../../ItemsListPaginatedWrapper/ItemsListPaginatedWrapper';
import styles from './ItemsList.module.scss';
import { ItemsListLoader } from './ItemsListLoader';

export const ItemsList = () => {
	return (
		<div className={styles.items}>
			<CustomizationPageHeader
				title="Items"
				href={PAGES.ITEM_NEW}
				buttonText="Add New Item"
			/>
			<ItemsListPaginatedWrapper<Item>
				queryFn={({ language: _l, ...params }) => getAllItems(params)}
				queryKey={({ language: _l, ...params }) => [
					...QUERY_KEYS.customization.item.getAll(params),
				]}
				loader={<ItemsListLoader />}
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
