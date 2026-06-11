'use client';

import { getReport } from '@/api';
import { PageWrapper } from '@/components/UI';
import { QUERY_KEYS } from '@/config';
import { useQuery } from '@tanstack/react-query';
import { ReportActions } from './ReportActions/ReportActions';
import { ReportDetail } from './ReportDetail/ReportDetail';

interface ReportProps {
	id: string;
}

export const Report = ({ id }: ReportProps) => {
	const { data } = useQuery({
		queryKey: QUERY_KEYS.report.detail(id),
		queryFn: () => getReport(id),
		enabled: !!id,
	});

	if (!data) return null;

	return (
		<PageWrapper
			title={data.title}
			description={data.description}
			sectionHeaderProps={{ titleProps: { variant: 'h2' }, gap: 0 }}
		>
			<ReportDetail report={data} />
			<ReportActions report={data} />
		</PageWrapper>
	);
};
