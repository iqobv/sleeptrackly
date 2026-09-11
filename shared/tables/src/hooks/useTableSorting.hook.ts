'use client';

import { SortingState, Updater } from '@tanstack/react-table';
import { useCallback, useMemo } from 'react';
import { SortOrder } from '../types/sortOrder.types';

interface UseTableSortingProps<TSortBy extends string> {
	sortBy: TSortBy | null;
	sortOrder: SortOrder | null;
	setFilters: (filters: {
		sortBy?: TSortBy | null;
		sortOrder?: SortOrder | null;
		page?: number | null;
	}) => void;
}

export const useTableSorting = <TSortBy extends string>({
	sortBy,
	sortOrder,
	setFilters,
}: UseTableSortingProps<TSortBy>) => {
	const sorting: SortingState = useMemo(
		() => (sortBy ? [{ id: sortBy, desc: sortOrder === SortOrder.desc }] : []),
		[sortBy, sortOrder],
	);

	const handleSortingChange = useCallback(
		(updater: Updater<SortingState>) => {
			const newSortingState =
				typeof updater === 'function' ? updater(sorting) : updater;

			if (newSortingState.length === 0) {
				setFilters({ sortBy: null, sortOrder: null, page: 0 });
				return;
			}

			const { id, desc } = newSortingState[0];

			setFilters({
				sortBy: id as TSortBy,
				sortOrder: desc ? SortOrder.desc : SortOrder.asc,
				page: 0,
			});
		},
		[sorting, setFilters],
	);

	return {
		sorting,
		handleSortingChange,
	};
};
