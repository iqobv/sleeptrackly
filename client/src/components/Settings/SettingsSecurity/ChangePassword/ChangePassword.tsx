'use client';

import { Modal } from '@/components/UI';
import { useState } from 'react';
import SettingsSecurityField from '../SettingsSecurityField/SettingsSecurityField';
import styles from './ChangePassword.module.scss';
import ChangePasswordForm from './ChangePasswordForm/ChangePasswordForm';

const ChangePassword = () => {
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
				<Modal.Content className={styles.modal}>
					<Modal.Header>Change password</Modal.Header>
					<ChangePasswordForm handleClose={handleClose} />
				</Modal.Content>
			</Modal>
		</>
	);
};

export default ChangePassword;
