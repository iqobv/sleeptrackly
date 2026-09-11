'use client';

import { PAGES } from '@/config/pages.config';
import { Report } from '@/types/report/report.types';
import { capitalize } from '@shared/utils';
import dayjs from 'dayjs';
import Link from 'next/link';
import { CSSProperties } from 'react';
import styles from './ReportsListItem.module.scss';

interface ReportsListItemProps {
	report: Report;
}

export const ReportsListItem = ({ report }: ReportsListItemProps) => {
	return (
		<Link
			href={PAGES.REPORT(report.id)}
			className={styles.item}
			prefetch={false}
		>
			<div>
				<p>{report.title}</p>
				<div>
					Created at: {dayjs(report.createdAt).format('DD.MM.YYYY HH:mm:ss')}
				</div>
			</div>
			<div
				className={styles.status}
				style={
					{
						'--bg': `var(--bg-report-${report.status
							.toLowerCase()
							.replaceAll('_', '-')})`,
					} as CSSProperties
				}
			>
				{capitalize(report.status.toLowerCase().replaceAll('_', ' '))}
			</div>
		</Link>
	);
};
