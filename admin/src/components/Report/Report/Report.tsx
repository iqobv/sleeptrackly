'use client';

import { getReport } from '@/api';
import { QUERY_KEYS } from '@/config';
import { useQuery } from '@tanstack/react-query';
import styles from './Report.module.scss';
import { ReportActions } from './ReportActions/ReportActions';
import { ReportDetail } from './ReportDetail/ReportDetail';

interface ReportProps {
	id: string;
}

export const Report = ({ id }: ReportProps) => {
	const { data } = useQuery({
		queryKey: QUERY_KEYS.report.getReport(id),
		queryFn: () => getReport(id),
		enabled: !!id,
	});

	return (
		<div className={styles.report}>
			{data && (
				<>
					<ReportDetail report={data} />
					<ReportActions report={data} />
				</>
			)}
		</div>
	);
};
