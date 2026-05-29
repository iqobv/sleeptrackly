'use client';

import { Button, SectionHeader } from '@/components/UI';
import { REPORT_STATUS } from '@/constants';
import { ReportFull } from '@/types';
import { useState } from 'react';
import styles from './ReportSanction.module.scss';
import ReportSanctionForm from './ReportSanctionForm/ReportSanctionForm';
import ReportUserSanctions from './ReportUserSanctions/ReportUserSanctions';

interface ReportSanctionProps {
	report: ReportFull;
}
const ReportSanction = ({ report }: ReportSanctionProps) => {
	const [sanctions, setSanctions] = useState<number[]>([]);

	const handleAddSanction = () =>
		setSanctions((prev) => [...prev, new Date().getTime()]);

	const removeSanction = (el: number) => {
		setSanctions((prev) => prev.filter((element) => element !== el));
	};

	return (
		<div className={styles.sanction}>
			<SectionHeader
				title="Sanctions"
				titleProps={{
					variant: 'h3',
				}}
			/>
			{report.sanctions.length > 0 && (
				<ReportUserSanctions
					reportId={report.id}
					sanctions={report.sanctions}
				/>
			)}
			{report.status === REPORT_STATUS.IN_PROGRESS && (
				<>
					{sanctions.map((el) => (
						<div key={el}>
							<ReportSanctionForm
								reportId={report.id}
								removeSanction={() => removeSanction(el)}
								defaultValues={{
									reportId: report.id,
									targetUserId: report.targetUserId,
								}}
							/>
						</div>
					))}
					<Button type="button" onClick={handleAddSanction}>
						Add sanction
					</Button>
				</>
			)}
		</div>
	);
};

export default ReportSanction;
