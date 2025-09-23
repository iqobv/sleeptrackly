'use client';

import { Modal } from '@/components/UI';
import { useState } from 'react';
import SettingsSecurityField from '../SettingsSecurityField/SettingsSecurityField';
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
				isImportant
			/>
			<Modal isOpen={open} onClose={handleCLose}>
				<ChangePasswordForm handleCLose={handleCLose} />
			</Modal>
		</>
	);
};

export default ChangePassword;
