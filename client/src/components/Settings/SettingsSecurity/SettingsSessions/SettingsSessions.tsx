'use client';

import { Modal } from '@/components/UI';
import { useState } from 'react';
import SettingsSecurityField from '../SettingsSecurityField/SettingsSecurityField';
import SettingsSessionsList from './SettingsSessionsList/SettingsSessionsList';

import styles from './SettingsSessions.module.scss';

const SettingsSessions = () => {
	const [open, setOpen] = useState(false);

	const handleClose = () => setOpen(!open);

	return (
		<>
			<SettingsSecurityField
				action={handleClose}
				label="View your sessions"
				buttonText="View sessions"
			/>
			<Modal isOpen={open} onClose={handleClose} containerClassName={styles['sessions-modal']}>
				<SettingsSessionsList />
			</Modal>
		</>
	);
};

export default SettingsSessions;
