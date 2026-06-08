'use client';

import { useEffect } from 'react';

export const usePaginationBounds = (
	currentPage: number,
	setPage: (page: number) => void,
	totalPages?: number,
) => {
	useEffect(() => {
		if (totalPages !== undefined) {
			if (currentPage > totalPages) {
				setPage(totalPages);
			} else if (currentPage < 1) {
				setPage(1);
			}
		}
	}, [currentPage, setPage, totalPages]);
};
