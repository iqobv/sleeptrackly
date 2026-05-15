'use client';

import { Modal } from '@/components/UI';
import { useState } from 'react';
import SettingsSecurityField from '../SettingsSecurityField/SettingsSecurityField';
import styles from './ChangePassword.module.scss';
import ChangePasswordForm from './ChangePasswordForm/ChangePasswordForm';

const ChangePassword = () => {
	const [open, setOpen] = useState(false);

	const handleCLose = () => setOpen(!open);

	return (
		<>
			<SettingsSecurityField
				label="Change password"
				action={handleCLose}
				buttonText="Change password"
			/>
			<Modal
				isOpen={open}
				onClose={handleCLose}
				containerClassName={styles.modal}
			>
				<ChangePasswordForm handleCLose={handleCLose} />
			</Modal>
		</>
	);
};

export default ChangePassword;
