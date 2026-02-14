'use client';

import { MdArrowBackIosNew } from 'react-icons/md';
import Button from '../Button/Button';
import styles from './Pagination.module.scss';
import { PaginationProps } from './Pagination.types';
import { getPaginationRange } from './utils';

const Pagination = ({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationProps) => {
	if (totalPages <= 1) return null;

	const pages = getPaginationRange(currentPage, totalPages);

	return (
		<nav className={styles['pagination']}>
			<Button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage <= 1}
				isIcon
				variant="outlined"
			>
				<MdArrowBackIosNew />
			</Button>
			{pages.map((p, i) => (
				<Button
					key={i}
					onClick={() => typeof p === 'number' && onPageChange(p)}
					className={p === '...' ? styles['pagination__ellipsis'] : ''}
					variant={
						p === currentPage ? 'contained' : p === '...' ? 'text' : 'secondary'
					}
				>
					{p}
				</Button>
			))}

			<Button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage >= totalPages}
				isIcon
				variant="outlined"
			>
				<MdArrowBackIosNew
					style={{
						transform: 'rotate(180deg)',
					}}
				/>
			</Button>
		</nav>
	);
};

export default Pagination;
