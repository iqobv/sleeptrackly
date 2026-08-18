import { ColumnDef, RowData } from '@tanstack/react-table';

export type Columns<
	TData extends RowData,
	TValue = unknown,
> = ColumnDef<TData, TValue>[];
