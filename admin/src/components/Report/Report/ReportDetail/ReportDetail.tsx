'use client';

import { NavigationBackButton } from '@/components/UI';
import { PAGES } from '@/config';
import { FullReport } from '@/types';
import { SectionHeader } from '@shared/ui';
import Link from 'next/link';
import styles from './ReportDetail.module.scss';

interface ReportDetailProps {
	report: FullReport;
}

export const ReportDetail = ({ report }: ReportDetailProps) => {
	return (
		<div className={styles.reportDetail}>
			<SectionHeader
				title={report.title}
				description={report.description}
				titleProps={{
					variant: 'h2',
				}}
				leftSlot={<NavigationBackButton />}
			/>
			<div className={styles.info}>
				<div className={styles.user}>
					<p>Reported By: </p>
					<Link
						className={styles.username}
						href={PAGES.USER(report.reporter.username)}
						prefetch={false}
						target="_blank"
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
							prefetch={false}
							target="_blank"
						>
							{report.targetUser.username}
						</Link>
					</div>
				)}
				<p>Report Created At: {new Date(report.createdAt).toLocaleString()}</p>
			</div>
		</div>
	);
};
