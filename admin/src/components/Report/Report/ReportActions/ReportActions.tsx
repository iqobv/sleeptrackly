'use client';

import { updateReport } from '@/api';
import { Button } from '@/components/UI';
import { QUERY_KEYS } from '@/config';
import { REPORT_STATUS } from '@/constants';
import { IReportFull, TReportStatus } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ReportSanction from './ReportSanction/ReportSanction';

interface ReportActionsProps {
	report: IReportFull;
}

const ReportActions = ({ report }: ReportActionsProps) => {
	const queryCliet = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: ({ status }: { status?: TReportStatus }) =>
			updateReport(report.id, { status }),
		onSuccess: () => {
			queryCliet.invalidateQueries({
				queryKey: QUERY_KEYS.report.getReport(report.id),
			});
		},
	});

	return (
		<div>
			{report.status === REPORT_STATUS.PENDING && (
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
			{report.status === REPORT_STATUS.IN_PROGRESS && (
				<div>
					<Button onClick={() => mutate({ status: 'APPROVED' })}>
						Close report
					</Button>
				</div>
			)}
		</div>
	);
};

export default ReportActions;
