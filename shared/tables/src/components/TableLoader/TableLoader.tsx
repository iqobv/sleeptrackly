'use client';

import { getCoreRowModel } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Table } from '../Table/Table';
import { TableLoaderProps } from './TableLoader.types';

export const TableLoader = <T,>({
	columns,
	countRows = 10,
	children,
}: TableLoaderProps<T>) => {
	const skeletonColumns = useMemo(
		() =>
			columns.map((column) => ({
				...column,
				cell: () => children ?? <div>loading</div>,
				enableSorting: false,
			})),
		[columns],
	);

	const data = useMemo(
		() =>
			Array.from({ length: countRows }).map(
				(_, index) => ({ id: `skeleton-${index}` }) as unknown as T,
			),
		[countRows],
	);

	return (
		<Table
			columns={skeletonColumns}
			data={data}
			getCoreRowModel={getCoreRowModel()}
		/>
	);
};
