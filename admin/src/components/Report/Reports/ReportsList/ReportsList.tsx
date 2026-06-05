'use client';

import { getReports } from '@/api';
import { QUERY_KEYS } from '@/config';
import { useQuery } from '@tanstack/react-query';
import { ReportsChildsProps } from '../Reports';
import { ReportsPagination } from '../ReportsPagination/ReportsPagination';
import styles from './ReportsList.module.scss';
import { ReportsListItem } from './ReportsListItem/ReportsListItem';
import { ReportsListLoader } from './ReportsListLoader';

export const ReportsList = ({ filters, setFilters }: ReportsChildsProps) => {
	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.report.getReports(filters),
		queryFn: () => getReports(filters),
	});

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
							<ReportsPagination
								filters={filters}
								meta={data.meta}
								setFilters={setFilters}
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
