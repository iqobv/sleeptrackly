'use client';

import { SectionHeader } from '@/components/UI';
import { PAGES } from '@/config';
import { IReportFull } from '@/types';
import Link from 'next/link';
import styles from './ReportDetail.module.scss';

interface ReportDetailProps {
	report: IReportFull;
}

const ReportDetail = ({ report }: ReportDetailProps) => {
	return (
		<div className={styles['report-detail']}>
			<SectionHeader
				title={report.title}
				description={report.description}
				titleComponent="h2"
			/>
			<div className={styles['report-detail__info']}>
				<div className={styles['report-detail__user']}>
					<p>Reported By: </p>
					<Link
						className={styles['report-detail__username']}
						href={PAGES.USER(report.reporter.username)}
					>
						{report.reporter.username}
					</Link>
				</div>
				{report.targetUserId && report.targetUser && (
					<div className={styles['report-detail__user']}>
						<p>Target User: </p>
						<Link
							className={styles['report-detail__username']}
							href={PAGES.USER(report.targetUser.username)}
						>
							{report.targetUser.username}
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default ReportDetail;
