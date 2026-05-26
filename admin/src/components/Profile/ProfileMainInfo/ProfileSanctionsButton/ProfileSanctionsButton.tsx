'use client';

import ReportSanctionForm from '@/components/Report/Report/ReportActions/ReportSanction/ReportSanctionForm/ReportSanctionForm';
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalTrigger,
} from '@/components/UI';
import { Profile } from '@/types';
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
