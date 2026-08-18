'use client';

import { useTableContext } from '../Table/TableContext';
import styles from './TableHeader.module.scss';
import { TableHeaderCell } from './TableHeaderCell/TableHeaderCell';

export const TableHeader = () => {
	const { table } = useTableContext();

	return (
		<thead className={styles.tableHeader}>
			{table.getHeaderGroups().map((headerGroup) => (
				<tr key={headerGroup.id} className={styles.row}>
					{headerGroup.headers.map((header) => (
						<TableHeaderCell key={header.id} header={header} />
					))}
				</tr>
			))}
		</thead>
	);
};
