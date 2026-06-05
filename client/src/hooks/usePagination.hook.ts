'use client';

import { parseAsInteger, useQueryState } from 'nuqs';
import { useEffect } from 'react';

export const usePagination = (totalPages: number | undefined) => {
	const [currentPage, setPage] = useQueryState(
		'page',
		parseAsInteger.withDefault(1),
	);

	useEffect(() => {
		if (totalPages !== undefined && totalPages > 0) {
			if (currentPage > totalPages) {
				setPage(totalPages);
			} else if (currentPage < 1) {
				setPage(1);
			}
		}
	}, [currentPage, setPage, totalPages]);

	return { currentPage, setPage };
};
