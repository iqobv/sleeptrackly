'use client';

import { Modal, ModalContent, ModalHeader, ModalTrigger } from '@shared/ui';

interface DashboardSleepSessionCardFormModalProps {
	children: React.ReactNode;
	trigger: React.ReactNode;
	header: React.ReactNode;
}

export const DashboardSleepSessionCardFormModal = ({
	children,
	trigger,
	header,
}: DashboardSleepSessionCardFormModalProps) => {
	return (
		<Modal>
			<ModalTrigger asChild>{trigger}</ModalTrigger>
			<ModalContent>
				<ModalHeader>{header}</ModalHeader>
				{children}
			</ModalContent>
		</Modal>
	);
};
