import type {} from './tanstack-table';

export * from '@tanstack/react-table';

export { Table } from './components/Table/Table';
export type { CustomTableProps } from './components/Table/Table';

export { TableLoader } from './components/TableLoader/TableLoader';

export { usePaginationBounds } from './hooks/usePaginationBounds.hook';
export { useTablePagination } from './hooks/useTablePagination.hook';
export { useTableSorting } from './hooks/useTableSorting.hook';

export type { Columns } from './types/columns.types';
export { SortOrder } from './types/sortOrder.types';
