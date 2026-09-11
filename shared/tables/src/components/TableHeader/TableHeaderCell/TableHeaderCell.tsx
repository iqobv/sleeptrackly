'use client';

import { flexRender, Header } from '@tanstack/react-table';
import clsx from 'clsx';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import styles from './TableHeaderCell.module.scss';

interface TableHeaderCellProps<T> {
	header: Header<T, unknown>;
}

export const TableHeaderCell = <T,>({ header }: TableHeaderCellProps<T>) => {
	const meta = header.column.columnDef.meta;
	const columnSize = header.getSize();

	return (
		<th
			colSpan={header.colSpan}
			className={clsx(styles.cell, meta?.className)}
			style={{
				width: columnSize || meta?.style?.width || undefined,
				minWidth:
					header.column.columnDef.minSize || meta?.style?.minWidth || undefined,
				maxWidth:
					header.column.columnDef.maxSize || meta?.style?.maxWidth || undefined,
				...meta?.style,
			}}
		>
			<div
				onClick={header.column.getToggleSortingHandler()}
				className={clsx(
					styles.cellInner,
					header.column.getCanSort() && styles.sortable,
					meta?.center && styles.center,
				)}
			>
				<p>{flexRender(header.column.columnDef.header, header.getContext())}</p>
				{header.column.getIsSorted() === 'asc' ? <TiArrowSortedUp /> : null}
				{header.column.getIsSorted() === 'desc' ? <TiArrowSortedDown /> : null}
			</div>
		</th>
	);
};
