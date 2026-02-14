'use client';

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
		<div className={styles['list-wrapper-items']}>
			{items.map((item, index) => (
				<React.Fragment key={index}>{itemCard(item)}</React.Fragment>
			))}
		</div>
	);
};

export default ItemsListWrapper;
