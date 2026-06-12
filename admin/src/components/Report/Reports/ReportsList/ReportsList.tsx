'use client';

import { getReports } from '@/api/report/reports.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { Pagination } from '@shared/ui';
import { useQuery } from '@tanstack/react-query';
import { ReportsChildsProps } from '../Reports';
import styles from './ReportsList.module.scss';
import { ReportsListItem } from './ReportsListItem/ReportsListItem';
import { ReportsListLoader } from './ReportsListLoader';

export const ReportsList = ({ filters, setFilters }: ReportsChildsProps) => {
	const currentPage = filters.page;

	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.report.list(filters),
		queryFn: () => getReports(filters),
	});

	const handlePageChange = (page: number) => {
		setFilters((prev) => ({
			...prev,
			page,
		}));
	};

	return (
		<div className={styles.reports}>
			{isLoading && <ReportsListLoader />}
			{!isLoading && data && (
				<>
					{data.items.length > 0 ? (
						<div className={styles.wrapper}>
							<div className={styles.list}>
								{data.items.map((report) => (
									<ReportsListItem key={report.id} report={report} />
								))}
							</div>
							<Pagination
								currentPage={currentPage}
								onPageChange={handlePageChange}
								totalPages={data.meta.totalPages}
							/>
						</div>
					) : (
						<p>No reports</p>
					)}
				</>
			)}
		</div>
	);
};
