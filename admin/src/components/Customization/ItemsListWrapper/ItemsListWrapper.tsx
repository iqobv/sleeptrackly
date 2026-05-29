'use client';

import { Grid, GridItem } from '@/components/UI';
import React from 'react';

interface ItemsListWrapperProps<T> {
	itemCard: (item: T) => React.ReactNode;
	items: T[];
}

const ItemsListWrapper = <T,>({
	itemCard,
	items,
}: ItemsListWrapperProps<T>) => {
	return (
		<Grid
			columns="repeat(auto-fill, minmax(15.625rem, 1fr))"
			oneColumnOnMobile={false}
		>
			{items.map((item, index) => (
				<GridItem key={index}>{itemCard(item)}</GridItem>
			))}
		</Grid>
	);
};

export default ItemsListWrapper;
