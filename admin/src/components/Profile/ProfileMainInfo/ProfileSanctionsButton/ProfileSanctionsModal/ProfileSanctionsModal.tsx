'use client';

import ReportSanctionForm from '@/components/Report/Report/ReportActions/ReportSanction/ReportSanctionForm/ReportSanctionForm';
import { Modal } from '@/components/UI';

interface ProfileSanctionsModalProps {
	userId: string;
	isOpen: boolean;
	onClose: () => void;
}

const ProfileSanctionsModal = ({
	userId,
	isOpen,
	onClose,
}: ProfileSanctionsModalProps) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ReportSanctionForm
				defaultValues={{
					targetUserId: userId,
				}}
			/>
		</Modal>
	);
};

export default ProfileSanctionsModal;
