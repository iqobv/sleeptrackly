'use client';

import { getAllItems } from '@/api/customization/item/item.api';
import { PageWrapper } from '@/components/UI';
import { PAGES } from '@/config/pages.config';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { Item } from '@/types/customization/item/item.types';
import { Button } from '@shared/ui';
import Link from 'next/link';
import { ItemCard } from '../../ItemCard/ItemCard';
import { ItemsListPaginatedWrapper } from '../../ItemsListPaginatedWrapper/ItemsListPaginatedWrapper';
import { ItemsListLoader } from './ItemsListLoader';

export const ItemsList = () => {
	return (
		<PageWrapper
			title="Items"
			description="Manage the items available in the store"
			buttonText="Add New Item"
			href={PAGES.ITEM_NEW}
			showBackButton={false}
		>
			<ItemsListPaginatedWrapper<Item>
				queryFn={({ language: _l, ...params }) => getAllItems(params)}
				queryKey={({ language: _l, ...params }) =>
					QUERY_KEYS.customization.item.list(params)
				}
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
		</PageWrapper>
	);
};
