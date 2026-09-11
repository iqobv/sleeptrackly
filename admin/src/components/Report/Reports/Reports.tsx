'use client';

import { SectionHeader } from '@shared/ui';
import { ReportFilter } from './ReportFilter/ReportFilter';
import { ReportsList } from './ReportsList/ReportsList';
import { useReportFilters } from './useReportFilters.hook';

export interface ReportsChildsProps {
	filters: ReturnType<typeof useReportFilters>[0];
	setFilters: ReturnType<typeof useReportFilters>[1];
}

export const Reports = () => {
	const [filters, setFilters] = useReportFilters();

	return (
		<div>
			<SectionHeader title="Reports" />
			<ReportFilter filters={filters} setFilters={setFilters} />
			<ReportsList filters={filters} setFilters={setFilters} />
		</div>
	);
};
