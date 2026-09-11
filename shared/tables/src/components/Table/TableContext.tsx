'use client';

import { RowData, Table } from '@tanstack/react-table';
import { createContext, useContext } from 'react';

export interface LinkComponentProps {
	href: string;
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
}

export interface TableContextValue<TData extends RowData> {
	table: Table<TData>;
	getRowHref?: (row: TData) => string;
	LinkComponent?: React.ComponentType<LinkComponentProps> | string;
}

export const TableContext = createContext<TableContextValue<unknown> | null>(
	null,
);

export const useTableContext = <TData extends RowData>() => {
	const context = useContext(TableContext);

	if (!context) {
		throw new Error('useTableContext must be used within a TableProvider');
	}

	return context as TableContextValue<TData>;
};
