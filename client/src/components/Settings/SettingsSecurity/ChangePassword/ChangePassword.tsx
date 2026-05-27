'use client';

import { Modal, ModalContent, ModalHeader } from '@/components/UI';
import { useState } from 'react';
import { SettingsSecurityField } from '../SettingsSecurityField/SettingsSecurityField';
import styles from './ChangePassword.module.scss';
import { ChangePasswordForm } from './ChangePasswordForm/ChangePasswordForm';

export const ChangePassword = () => {
	const [open, setOpen] = useState(false);

	const handleClose = () => setOpen(!open);

	return (
		<>
			<SettingsSecurityField
				label="Change password"
				action={handleClose}
				buttonText="Change password"
			/>
			<Modal open={open} onOpenChange={handleClose}>
				<ModalContent className={styles.modal}>
					<ModalHeader>Change password</ModalHeader>
					<ChangePasswordForm handleClose={handleClose} />
				</ModalContent>
			</Modal>
		</>
	);
};
