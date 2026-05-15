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
		<div className={styles.reportDetail}>
			<SectionHeader
				title={report.title}
				description={report.description}
				titleComponent="h2"
			/>
			<div className={styles.info}>
				<div className={styles.user}>
					<p>Reported By: </p>
					<Link
						className={styles.username}
						href={PAGES.USER(report.reporter.username)}
					>
						{report.reporter.username}
					</Link>
				</div>
				{report.targetUserId && report.targetUser && (
					<div className={styles.user}>
						<p>Target User: </p>
						<Link
							className={styles.username}
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
