'use client';

import { ReportPaginationQuery, ReportStatus } from '@/types';
import { capitalize } from '@shared/utils';
import { ReportsChildsProps } from '../Reports';
import styles from './ReportFilter.module.scss';

const selectProps: Partial<React.ComponentProps<'select'>> = {
	className: styles.select,
};

export const ReportFilter = ({ filters, setFilters }: ReportsChildsProps) => {
	const onChange = (
		e: React.ChangeEvent<HTMLSelectElement>,
		key: keyof ReportPaginationQuery,
	) => {
		setFilters({
			page: 1,
			[key]: e.target.value,
		});
	};

	return (
		<div>
			<div className={styles.selects}>
				<select
					value={filters.status}
					onChange={(e) => onChange(e, 'status')}
					{...selectProps}
				>
					{Object.values(ReportStatus).map((status) => (
						<option key={status} value={status}>
							{capitalize(status.replaceAll('_', ' ').toLowerCase())}
						</option>
					))}
				</select>
				<select
					value={filters.sortBy}
					onChange={(e) => onChange(e, 'sortBy')}
					{...selectProps}
				>
					<option value="createdAt">Created At</option>
					<option value="updatedAt">Updated At</option>
				</select>
				<select
					value={filters.sortOrder}
					onChange={(e) => onChange(e, 'sortOrder')}
					{...selectProps}
				>
					<option value="desc">Desc</option>
					<option value="asc">Asc</option>
				</select>
			</div>
		</div>
	);
};
