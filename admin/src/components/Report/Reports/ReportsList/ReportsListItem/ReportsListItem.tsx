'use client';

import { PAGES } from '@/config';
import { Report } from '@/types';
import { capitalize } from '@/utils';
import dayjs from 'dayjs';
import Link from 'next/link';
import { CSSProperties } from 'react';
import styles from './ReportsListItem.module.scss';

interface ReportsListItemProps {
	report: Report;
}

const ReportsListItem = ({ report }: ReportsListItemProps) => {
	return (
		<Link href={PAGES.REPORT(report.id)} className={styles.item}>
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

export default ReportsListItem;
