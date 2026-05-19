'use client';

import ReportSanctionForm from '@/components/Report/Report/ReportActions/ReportSanction/ReportSanctionForm/ReportSanctionForm';
import { Button, Modal } from '@/components/UI';
import { Profile } from '@/types';
import { MdReportGmailerrorred } from 'react-icons/md';

interface ProfileSanctionsButtonProps {
	profile: Profile;
}

const ProfileSanctionsButton = ({ profile }: ProfileSanctionsButtonProps) => {
	return (
		<Modal>
			<Modal.Trigger asChild>
				<Button
					isIcon
					size="sm"
					variant="contained"
					color="secondary"
					title="Send Report"
				>
					<MdReportGmailerrorred size={30} />
				</Button>
			</Modal.Trigger>
			<Modal.Content>
				<Modal.Header>Select Sanction</Modal.Header>
				<Modal.Body>
					<ReportSanctionForm
						defaultValues={{
							targetUserId: profile.id,
						}}
					/>
				</Modal.Body>
			</Modal.Content>
		</Modal>
	);
};

export default ProfileSanctionsButton;
