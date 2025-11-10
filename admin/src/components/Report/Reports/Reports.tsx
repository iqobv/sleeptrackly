'use client';

import { SectionHeader } from '@/components/UI';
import { IReportPaginationQuery, TReportStatus, TReportType } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReportFilter from './ReportFilter/ReportFilter';
import styles from './Reports.module.scss';
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
		const newSearchParams = new URLSearchParams(searchParams);
		Object.entries(filters).forEach(([key, value]) => {
			if (value) {
				newSearchParams.set(key, String(value));
			}
		});

		router.push(`?${newSearchParams.toString()}`);
	}, [filters, router, searchParams]);

	return (
		<div className={styles['reports']}>
			<SectionHeader title="Reports" />
			<ReportFilter filters={filters} setFilters={setFilters} />
			<ReportsList filters={filters} setFilters={setFilters} />
		</div>
	);
};

export default Reports;
