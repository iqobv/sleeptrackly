'use client';

import { ReportSanctionForm } from '@/components/Report';
import { Profile } from '@/types';
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalTrigger,
} from '@shared/ui';
import { MdReportGmailerrorred } from 'react-icons/md';

interface ProfileSanctionsButtonProps {
	profile: Profile;
}

const ProfileSanctionsButton = ({ profile }: ProfileSanctionsButtonProps) => {
	return (
		<Modal>
			<ModalTrigger asChild>
				<Button
					isIcon
					size="sm"
					variant="contained"
					color="secondary"
					title="Send Report"
				>
					<MdReportGmailerrorred size={30} />
				</Button>
			</ModalTrigger>
			<ModalContent>
				<ModalHeader>Select Sanction</ModalHeader>
				<ModalBody>
					<ReportSanctionForm
						defaultValues={{
							targetUserId: profile.id,
						}}
					/>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default ProfileSanctionsButton;
