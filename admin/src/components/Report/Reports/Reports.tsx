'use client';

import { SectionHeader } from '@/components/UI';
import { IReportPaginationQuery, TReportStatus, TReportType } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReportFilter from './ReportFilter/ReportFilter';
import ReportsList from './ReportsList/ReportsList';

const Reports = () => {
	const searchParams = useSearchParams();
	const router = useRouter();

	const [filters, setFilters] = useState<IReportPaginationQuery>({
		page: Number(searchParams.get('page')) || 1,
		pageSize: Number(searchParams.get('pageSize')) || 10,
		reportType: (searchParams.get('reportType') as TReportType) || 'USER',
		sortBy:
			(searchParams.get('sortBy') as 'createdAt' | 'updatedAt') || 'createdAt',
		sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc',
		status: (searchParams.get('status') as TReportStatus) || 'PENDING',
	});

	useEffect(() => {
		const currentParams = new URLSearchParams(searchParams.toString());
		let hasChanges = false;

		Object.entries(filters).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				const stringValue = String(value);
				if (currentParams.get(key) !== stringValue) {
					currentParams.set(key, stringValue);
					hasChanges = true;
				}
			}
		});

		if (hasChanges) {
			router.push(`?${currentParams.toString()}`, { scroll: false });
		}
	}, [filters, router, searchParams]);

	return (
		<div>
			<SectionHeader title="Reports" />
			<ReportFilter filters={filters} setFilters={setFilters} />
			<ReportsList filters={filters} setFilters={setFilters} />
		</div>
	);
};

export default Reports;
