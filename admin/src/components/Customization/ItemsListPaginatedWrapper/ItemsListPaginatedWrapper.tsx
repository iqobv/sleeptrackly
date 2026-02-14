'use client';

import { Pagination } from '@/components/UI';
import { PaginationDto } from '@/dto';
import { usePagination } from '@/hooks';
import { IPaginatedDataResponse } from '@/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import ItemsListWrapper from '../ItemsListWrapper/ItemsListWrapper';
import styles from './ItemsListPaginatedWrapper.module.scss';

interface ItemsListPaginatedWrapperProps<T> {
	queryFn: (query: PaginationDto) => Promise<IPaginatedDataResponse<T>>;
	queryKey: (query: PaginationDto) => unknown[];
	queryOptions?: Omit<
		UseQueryOptions<IPaginatedDataResponse<T>, Error>,
		'queryKey' | 'queryFn'
	>;
	itemCard: (item: T) => React.ReactNode;
}

const ItemsListPaginatedWrapper = <T,>({
	itemCard,
	queryOptions,
	queryFn,
	queryKey,
}: ItemsListPaginatedWrapperProps<T>) => {
	const searchParams = useSearchParams();
	const pageFromUrl = Number(searchParams.get('page')) || 1;

	const params: PaginationDto = {
		page: pageFromUrl,
		limit: 20,
	};

	const { data } = useQuery<IPaginatedDataResponse<T>, Error>({
		queryFn: () => queryFn(params),
		queryKey: queryKey(params),
		...queryOptions,
	});

	const { currentPage, setPage } = usePagination(data?.meta.totalPages || 1);

	return (
		<div className={styles['items-list-wrapper']}>
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
