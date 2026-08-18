'use client';

import { updateReport } from '@/api/report/reports.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { FullReport } from '@/types/report/report.types';
import { ReportStatus } from '@/types/report/reportStatus.types';
import { Button } from '@shared/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReportSanction } from './ReportSanction/ReportSanction';

interface ReportActionsProps {
	report: FullReport;
}

export const ReportActions = ({ report }: ReportActionsProps) => {
	const queryCliet = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: ({ status }: { status?: ReportStatus }) =>
			updateReport(report.id, { status }),
		onSuccess: () => {
			queryCliet.invalidateQueries({
				queryKey: QUERY_KEYS.report.detail(report.id),
			});
			queryCliet.invalidateQueries({
				queryKey: QUERY_KEYS.report.lists(),
			});
		},
	});

	return (
		<div>
			{report.status === ReportStatus.PENDING && (
				<div>
					<Button
						type="submit"
						onClick={() => mutate({ status: 'IN_PROGRESS' })}
					>
						Solve
					</Button>
				</div>
			)}
			<ReportSanction report={report} />
			{report.status === ReportStatus.IN_PROGRESS && (
				<div>
					<Button onClick={() => mutate({ status: 'APPROVED' })}>
						Close report
					</Button>
				</div>
			)}
		</div>
	);
};
