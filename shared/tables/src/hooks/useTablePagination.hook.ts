'use client';

import { PaginationState, Updater } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
import { usePaginationBounds } from './usePaginationBounds.hook';

interface UseTablePaginationProps {
	page: number;
	limit: number;
	setFilters: (filters: {
		page?: number | null;
		limit?: number | null;
	}) => void;
	totalPages?: number;
}

export const useTablePagination = ({
	page,
	limit,
	setFilters,
	totalPages,
}: UseTablePaginationProps) => {
	const pagination: PaginationState = useMemo(
		() => ({
			pageIndex: page,
			pageSize: limit,
		}),
		[page, limit],
	);

	usePaginationBounds(
		page,
		(validPage) => setFilters({ page: validPage }),
		totalPages,
	);

	const handlePaginationChange = useCallback(
		(updater: Updater<PaginationState>) => {
			const newPagination =
				typeof updater === 'function' ? updater(pagination) : updater;

			setFilters({
				page: newPagination.pageIndex,
				limit: newPagination.pageSize,
			});
		},
		[pagination, setFilters],
	);

	return {
		pagination,
		handlePaginationChange,
	};
};
