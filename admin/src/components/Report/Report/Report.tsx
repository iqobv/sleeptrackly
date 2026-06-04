'use client';

import { getReport } from '@/api';
import { Button } from '@/components/UI';
import { QUERY_KEYS } from '@/config';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { MdOutlineArrowBack } from 'react-icons/md';
import styles from './Report.module.scss';
import { ReportActions } from './ReportActions/ReportActions';
import { ReportDetail } from './ReportDetail/ReportDetail';

interface ReportProps {
	id: string;
}

export const Report = ({ id }: ReportProps) => {
	const router = useRouter();

	const { data, isLoading: _isLoading } = useQuery({
		queryKey: QUERY_KEYS.report.getReport(id),
		queryFn: () => getReport(id),
		enabled: !!id,
	});

	return (
		<div className={styles.report}>
			<Button variant="text" onClick={() => router.back()}>
				<MdOutlineArrowBack />
				Back
			</Button>
			{data && (
				<>
					<ReportDetail report={data} />
					<ReportActions report={data} />
				</>
			)}
		</div>
	);
};
