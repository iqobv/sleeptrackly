'use client';

import { ColumnMeta, flexRender, RowData } from '@tanstack/react-table';
import React from 'react';
import { useTableContext } from '../Table/TableContext';

interface TableRowData {
	isSkeleton?: boolean;
}

export const TableBody = <D extends RowData>() => {
	const { table, getRowHref, LinkComponent } = useTableContext<D>();
	const columnsCount = table.getAllColumns().length;

	const LinkWrapper = LinkComponent || 'a';

	return (
		<tbody>
			{table.getRowModel().rows.map((row) => {
				const rowData = row.original as TableRowData;
				const isSkeleton = rowData.isSkeleton;
				const href = getRowHref ? getRowHref(row.original as D) : undefined;

				if (isSkeleton) {
					return (
						<tr key={row.id}>
							<td colSpan={columnsCount}>
								<div style={{ width: '100%' }}>
									{flexRender(
										row.getVisibleCells()[0].column.columnDef.cell,
										row.getVisibleCells()[0].getContext(),
									)}
								</div>
							</td>
						</tr>
					);
				}

				return (
					<tr key={row.id}>
						{row.getVisibleCells().map((cell) => {
							const { column } = cell;
							const meta = column.columnDef.meta as
								ColumnMeta<D, unknown> | undefined;

							const cellStyle: React.CSSProperties = {
								width: cell.column.getSize() || meta?.style?.width,
								maxWidth:
									cell.column.columnDef.maxSize || meta?.style?.maxWidth,
								minWidth:
									cell.column.columnDef.minSize || meta?.style?.minWidth,
								...meta?.style,
							};

							const renderedCell = flexRender(
								cell.column.columnDef.cell,
								cell.getContext(),
							);

							return (
								<td
									key={cell.id}
									className={meta?.className || ''}
									style={cellStyle}
								>
									{href && !meta?.disableLink ? (
										<LinkWrapper
											href={href}
											style={{
												display: 'block',
												width: '100%',
												height: '100%',
												textDecoration: 'none',
												color: 'inherit',
											}}
										>
											{renderedCell}
										</LinkWrapper>
									) : (
										renderedCell
									)}
								</td>
							);
						})}
					</tr>
				);
			})}
		</tbody>
	);
};
