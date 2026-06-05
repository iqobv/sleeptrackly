'use client';

import { parseAsInteger, useQueryState } from 'nuqs';

export const usePagination = (queryKey: string = 'page') => {
	const [currentPage, setPage] = useQueryState(
		queryKey,
		parseAsInteger.withDefault(1),
	);

	return { currentPage, setPage };
};
