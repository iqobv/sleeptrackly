'use client';

import { deleteAccount } from '@/api/auth/auth.api';
import { Button, ConfirmModal } from '@shared/ui';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SettingsField } from '../../SettingsField/SettingsField';
import styles from '../SettingsSecurityField/SettingsSecurityField.module.scss';

export const SettingsDeleteAccount = () => {
	const router = useRouter();

	const [isOpen, setIsOpen] = useState(false);

	const handleClose = () => setIsOpen(!isOpen);

	const { mutate } = useMutation({
		mutationFn: deleteAccount,
		onSuccess() {
			router.refresh();
		},
	});

	const handleDelete = () => {
		mutate();
		handleClose();
	};

	return (
		<SettingsField label="Delete account">
			<ConfirmModal
				onConfirm={handleDelete}
				title="Delete account"
				text="You sure you want to delete your account? If you delete your
            account, all of your data will be permanently removed from our
            servers forever. This action cannot be undone."
			>
				<Button variant="outlined" color="danger" className={styles.button}>
					Delete account
				</Button>
			</ConfirmModal>
		</SettingsField>
	);
};
