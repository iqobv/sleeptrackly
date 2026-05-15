'use client';

import { Button } from '@/components/UI';
import { ButtonSize, ButtonVariant } from '@/components/UI/Button/Button.types';
import { ReportPaginatedMeta, ReportPaginationQuery } from '@/types';
import { Dispatch, SetStateAction } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import styles from './ReportsPagination.module.scss';
import { useReportsPagination } from './useReportsPagination';

interface ReportsPaginationProps {
	filters: ReportPaginationQuery;
	meta: ReportPaginatedMeta;
	setFilters: Dispatch<SetStateAction<ReportPaginationQuery>>;
}

const defaultButtonProps: {
	className: string;
	variant: ButtonVariant;
	isIcon: boolean;
	size: ButtonSize;
} = {
	className: styles.button,
	variant: 'text',
	isIcon: true,
	size: 'sm',
};

const ReportsPagination = ({
	filters,
	meta,
	setFilters,
}: ReportsPaginationProps) => {
	const { page } = filters;
	const { totalPages } = meta;

	const { handleNext, handlePrev, handleChangePage, getPaginationRange } =
		useReportsPagination({
			filters,
			meta,
			setFilters,
		});

	const paginationRange = getPaginationRange();

	if (totalPages <= 1) return null;

	return (
		<div className={styles.pagination}>
			<Button
				disabled={page === 1}
				onClick={handlePrev}
				{...defaultButtonProps}
			>
				<MdKeyboardArrowLeft size={25} />
			</Button>
			<div className={styles.pages}>
				{paginationRange.map((item, idx) => {
					const isDots = item === '...';
					if (isDots) {
						return (
							<div
								key={`dots-${idx}`}
								className={`${styles.button} ${styles.dots}`}
							>
								...
							</div>
						);
					}
					const pageNumber = item as number;
					const isActive = pageNumber === page;
					return (
						<Button
							key={pageNumber}
							{...defaultButtonProps}
							className={`${defaultButtonProps.className} ${
								isActive ? styles.active : ''
							}`}
							disabled={isActive}
							onClick={() => handleChangePage(pageNumber)}
						>
							<div className={styles.buttonText}>{pageNumber}</div>
						</Button>
					);
				})}
			</div>
			<Button
				disabled={page === totalPages}
				onClick={handleNext}
				{...defaultButtonProps}
			>
				<MdKeyboardArrowRight size={25} />
			</Button>
		</div>
	);
};

export default ReportsPagination;
