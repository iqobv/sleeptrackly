import { ColumnDef } from '@tanstack/react-table';

export interface TableLoaderProps<T> {
	columns: ColumnDef<T, unknown>[];
	countRows?: number;
	children?: React.ReactNode;
}
