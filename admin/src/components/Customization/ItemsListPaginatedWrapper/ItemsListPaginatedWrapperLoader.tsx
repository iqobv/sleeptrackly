import { PaginationLoader } from '@shared/ui';
import clsx from 'clsx';
import React from 'react';
import { ItemsListWrapperLoader } from '../ItemsListWrapper/ItemsListWrapperLoader';
import styles from './ItemsListPaginatedWrapper.module.scss';

interface ItemsListPaginatedWrapperLoaderProps {
	isModal?: boolean;
	children: React.ReactNode;
	count?: number;
}

export const ItemsListPaginatedWrapperLoader = ({
	isModal = false,
	children,
	count = 6,
}: ItemsListPaginatedWrapperLoaderProps) => {
	const classNames = clsx(styles.wrapper, isModal && styles.isModal);

	return (
		<div className={classNames}>
			<ItemsListWrapperLoader>
				{Array.from({ length: count }).map((_, i) => (
					<React.Fragment key={i}>{children}</React.Fragment>
				))}
			</ItemsListWrapperLoader>
			<PaginationLoader />
		</div>
	);
};
