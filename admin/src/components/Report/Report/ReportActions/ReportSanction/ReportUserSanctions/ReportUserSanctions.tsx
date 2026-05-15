'use client';

import { UserSanction } from '@/types';
import ReportUserSanctionsItem from './ReportUserSanctionsItem/ReportUserSanctionsItem';

interface ReportUserSanctionsProps {
	reportId: string;
	sanctions: UserSanction[];
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
