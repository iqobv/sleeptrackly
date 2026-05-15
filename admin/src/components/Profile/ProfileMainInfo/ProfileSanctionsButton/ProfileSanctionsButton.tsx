'use client';

import { Button } from '@/components/UI';
import { Profile } from '@/types';
import { useState } from 'react';
import { MdReportGmailerrorred } from 'react-icons/md';
import ProfileSanctionsModal from './ProfileSanctionsModal/ProfileSanctionsModal';

interface ProfileSanctionsButtonProps {
	profile: Profile;
}

const ProfileSanctionsButton = ({ profile }: ProfileSanctionsButtonProps) => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(!open);

	return (
		<>
			<Button
				isIcon
				size="sm"
				variant="secondary"
				onClick={handleOpen}
				title="Send Report"
			>
				<MdReportGmailerrorred size={30} />
			</Button>
			<ProfileSanctionsModal
				isOpen={open}
				onClose={handleOpen}
				userId={profile.id}
			/>
		</>
	);
};

export default ProfileSanctionsButton;
