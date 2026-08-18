'use client';

import {
	getCoreRowModel,
	RowData,
	TableOptions,
	Table as TableType,
	useReactTable,
} from '@tanstack/react-table';
import { TableBody } from '../TableBody/TableBody';
import { TableFooter } from '../TableFooter/TableFooter';
import { TableHeader } from '../TableHeader/TableHeader';
import styles from './Table.module.scss';
import {
	LinkComponentProps,
	TableContext,
	TableContextValue,
} from './TableContext';

export interface CustomTableProps<T extends RowData> extends TableOptions<T> {
	getRowHref?: (row: T) => string | undefined;
	LinkComponent?: React.ComponentType<LinkComponentProps> | string;
}

export const Table = <T extends RowData>(props: CustomTableProps<T>) => {
	const options: TableOptions<T> = {
		...props,
		getCoreRowModel: props.getCoreRowModel ?? getCoreRowModel(),
	};

	const table = useReactTable(options);

	const getRowHref = props.getRowHref
		? (row: unknown) => props.getRowHref!(row as T) ?? ''
		: undefined;

	const contextValue: TableContextValue<unknown> = {
		table: table as unknown as TableType<unknown>,
		getRowHref,
		LinkComponent: props.LinkComponent,
	};

	const hasFooters = table
		.getAllColumns()
		.some((column) => column.columnDef.footer);

	return (
		<TableContext.Provider value={contextValue}>
			<div className={styles.container}>
				<table className={styles.table}>
					<TableHeader />
					<TableBody />
					{hasFooters && <TableFooter />}
				</table>
			</div>
		</TableContext.Provider>
	);
};
