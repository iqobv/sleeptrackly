'use client';

import { Pagination } from '@/components/UI';
import { PaginationDto } from '@/dto';
import { usePagination, usePaginationBounds } from '@/hooks';
import { PaginatedDataResponse } from '@/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import clsx from 'clsx';
import React from 'react';
import ItemsListWrapper from '../ItemsListWrapper/ItemsListWrapper';
import styles from './ItemsListPaginatedWrapper.module.scss';

interface ItemsListPaginatedWrapperProps<T> {
	queryFn: (query: PaginationDto) => Promise<PaginatedDataResponse<T>>;
	queryKey: (query: PaginationDto) => unknown[];
	queryOptions?: Omit<
		UseQueryOptions<PaginatedDataResponse<T>, Error>,
		'queryKey' | 'queryFn'
	>;
	itemCard: (item: T) => React.ReactNode;
	className?: string;
	isModal?: boolean;
	loader?: React.ReactNode;
}

const ItemsListPaginatedWrapper = <T,>({
	itemCard,
	queryOptions,
	queryFn,
	queryKey,
	className = '',
	isModal = false,
	loader,
}: ItemsListPaginatedWrapperProps<T>) => {
	const { currentPage, setPage } = usePagination();

	const params: PaginationDto = {
		page: currentPage,
		limit: 20,
	};

	const { data, isLoading } = useQuery<PaginatedDataResponse<T>, Error>({
		queryFn: () => queryFn(params),
		queryKey: queryKey(params),
		...queryOptions,
	});

	usePaginationBounds(currentPage, setPage, data?.meta.totalPages);

	const classNames = clsx(styles.wrapper, isModal && styles.isModal, className);

	if (isLoading && loader) return loader;

	return (
		<div className={classNames}>
			{data ? (
				<>
					<ItemsListWrapper items={data.items} itemCard={itemCard} />
					<Pagination
						currentPage={currentPage}
						onPageChange={setPage}
						totalPages={data.meta.totalPages}
					/>
				</>
			) : (
				<div>No data available</div>
			)}
		</div>
	);
};

export default ItemsListPaginatedWrapper;
