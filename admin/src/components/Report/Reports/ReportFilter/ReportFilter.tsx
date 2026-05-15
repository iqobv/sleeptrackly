'use client';

import { REPORT_STATUS } from '@/constants';
import { IReportPaginationQuery } from '@/types';
import { capitalize } from '@/utils';
import { Dispatch, SetStateAction } from 'react';
import styles from './ReportFilter.module.scss';

interface ReportFilterProps {
	filters: IReportPaginationQuery;
	setFilters: Dispatch<SetStateAction<IReportPaginationQuery>>;
}

const selectProps: Partial<React.ComponentProps<'select'>> = {
	className: styles.select,
};

const ReportFilter = ({ filters, setFilters }: ReportFilterProps) => {
	const onChange = (
		e: React.ChangeEvent<HTMLSelectElement>,
		key: keyof IReportPaginationQuery,
	) => {
		setFilters({
			...filters,
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
					{Object.values(REPORT_STATUS).map((status) => (
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

export default ReportFilter;
