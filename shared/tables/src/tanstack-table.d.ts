import '@tanstack/react-table';
import { RowData } from '@tanstack/react-table';
import { CSSProperties } from 'react';

declare module '@tanstack/react-table' {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface ColumnMeta<TData extends RowData, TValue> {
		className?: string;
		style?: CSSProperties;
		center?: boolean;
		disableLink?: boolean;
	}
}

export {};
