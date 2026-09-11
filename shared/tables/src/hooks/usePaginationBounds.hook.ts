'use client';

import { useEffect } from 'react';

export const usePaginationBounds = (
	pageIndex: number,
	setPage: (page: number) => void,
	totalPages?: number,
) => {
	useEffect(() => {
		if (totalPages === undefined || totalPages === 0) return;

		if (pageIndex >= totalPages) {
			setPage(totalPages - 1);
		} else if (pageIndex < 0) {
			setPage(0);
		}
	}, [pageIndex, setPage, totalPages]);
};
