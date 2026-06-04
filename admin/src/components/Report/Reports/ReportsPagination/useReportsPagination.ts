'use client';

import { PaginatedMetaData, ReportPaginationQuery } from '@/types';
import { Dispatch, SetStateAction } from 'react';

interface useReportsPaginationProps {
	filters: ReportPaginationQuery;
	meta: PaginatedMetaData;
	setFilters: Dispatch<SetStateAction<ReportPaginationQuery>>;
}

const SIBLING_COUNT = 1;

export const useReportsPagination = ({
	filters,
	meta,
	setFilters,
}: useReportsPaginationProps) => {
	const { page } = filters;
	const { totalPages } = meta;

	const handleChangePage = (page: number) => {
		setFilters((prev) => ({
			...prev,
			page,
		}));
	};

	const handleNext = () => {
		handleChangePage(page === totalPages ? totalPages : page + 1);
	};

	const handlePrev = () => {
		handleChangePage(page <= 1 ? 1 : page - 1);
	};

	const getPaginationRange = () => {
		const totalPageNumbers = SIBLING_COUNT * 2 + 5;
		if (totalPageNumbers >= totalPages) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}

		const leftSibling = Math.max(page - SIBLING_COUNT, 1);
		const rightSibling = Math.min(page + SIBLING_COUNT, totalPages);

		const showLeftDots = leftSibling > 2;
		const showRightDots = rightSibling < totalPages - 1;

		const firstPage = 1;
		const lastPage = totalPages;

		if (showLeftDots && showRightDots) {
			return [
				firstPage,
				'...',
				leftSibling,
				page,
				rightSibling,
				'...',
				lastPage,
			];
		}
		if (!showLeftDots && showRightDots) {
			const leftRange = Array.from(
				{ length: 3 + SIBLING_COUNT },
				(_, i) => i + 1,
			);
			return [...leftRange, '...', lastPage];
		}
		if (showLeftDots && !showRightDots) {
			const rightRange = Array.from(
				{ length: 3 + SIBLING_COUNT },
				(_, i) => totalPages - (3 + SIBLING_COUNT) + 1 + i,
			);
			return [firstPage, '...', ...rightRange];
		}

		return Array.from({ length: totalPages }, (_, i) => i + 1);
	};

	return {
		handleNext,
		handlePrev,
		handleChangePage,
		getPaginationRange,
	};
};
