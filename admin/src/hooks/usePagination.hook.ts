'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

export const usePagination = (totalPages: number | undefined) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const currentPage = Number(searchParams.get('page')) || 1;

	const setPage = useCallback(
		(page: number) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set('page', page.toString());
			router.push(`${pathname}?${params.toString()}`);
		},
		[router, pathname, searchParams],
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
