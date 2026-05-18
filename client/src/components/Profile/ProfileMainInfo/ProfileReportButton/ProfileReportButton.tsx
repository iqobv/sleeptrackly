'use client';

import ReportModal from '@/components/ReportModal/ReportModal';
import { Button } from '@/components/UI';
import { Profile } from '@/types';
import { useState } from 'react';
import { MdReportGmailerrorred } from 'react-icons/md';

interface ProfileReportButtonProps {
	profile: Profile;
}

const ProfileReportButton = ({ profile }: ProfileReportButtonProps) => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(!open);

	return (
		<>
			<Button
				isIcon
				size="sm"
				variant="contained"
				color="secondary"
				onClick={handleOpen}
				title="Send Report"
			>
				<MdReportGmailerrorred size={30} />
			</Button>
			<ReportModal
				isOpen={open}
				modalTitle="Report User"
				onClose={handleOpen}
				reportedId={profile.id}
			/>
		</>
	);
};

export default ProfileReportButton;
