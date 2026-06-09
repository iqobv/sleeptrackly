'use client';

import { Grid, GridItem } from '@shared/ui';
import React from 'react';
import styles from './ItemsListWrapper.module.scss';

interface ItemsListWrapperProps<T> {
	itemCard: (item: T) => React.ReactNode;
	items: T[];
}

const ItemsListWrapper = <T,>({
	itemCard,
	items,
}: ItemsListWrapperProps<T>) => {
	return (
		<Grid className={styles.itemsGrid}>
			{items.map((item, index) => (
				<GridItem key={index}>{itemCard(item)}</GridItem>
			))}
		</Grid>
	);
};

export default ItemsListWrapper;
