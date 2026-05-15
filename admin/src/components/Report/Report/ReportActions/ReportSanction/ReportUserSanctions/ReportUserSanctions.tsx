'use client';

import { IUserSanction } from '@/types';
import ReportUserSanctionsItem from './ReportUserSanctionsItem/ReportUserSanctionsItem';

interface ReportUserSanctionsProps {
	reportId: string;
	sanctions: IUserSanction[];
}

const ReportUserSanctions = ({
	reportId,
	sanctions,
}: ReportUserSanctionsProps) => {
	return (
		<div>
			{sanctions.map((sanction, index) => (
				<ReportUserSanctionsItem
					key={sanction.id}
					sanction={sanction}
					reportId={reportId}
					index={index}
				/>
			))}
		</div>
	);
};

export default ReportUserSanctions;
