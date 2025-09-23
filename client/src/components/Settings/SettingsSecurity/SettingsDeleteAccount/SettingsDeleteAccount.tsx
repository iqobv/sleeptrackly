'use client';

import { Button, Modal } from '@/components/UI';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SettingsSecurityField from '../SettingsSecurityField/SettingsSecurityField';

import { deleteAccount } from '@/api';
import styles from './SettingsDeleteAccount.module.scss';

const SettingsDeleteAccount = () => {
	const router = useRouter();

	const [isOpen, setIsOpen] = useState(false);

	const handleCLose = () => setIsOpen(!isOpen);

	const { mutate } = useMutation({
		mutationFn: deleteAccount,
		mutationKey: ['delete-account'],
		onSuccess() {
			router.refresh();
		},
	});

	const handleDelete = () => {
		mutate();
		handleCLose();
	};

	return (
		<>
			<SettingsSecurityField
				action={handleCLose}
				label="Delete account"
				buttonText="Delete"
				isImportant
			/>
			<Modal isOpen={isOpen} onClose={handleCLose}>
				<div className={styles['modal__content']}>
					<h3 className={styles['modal__title']}>Delete account</h3>
					<p className={styles['modal__description']}>
						You sure you want to delete your account? If you delete your
						account, all of your data will be permanently removed from our
						servers forever. This action cannot be undone.
					</p>
				</div>
				<div className={styles['modal__buttons']}>
					<Button onClick={handleCLose}>Cancel</Button>
					<Button onClick={handleDelete}>Delete account</Button>
				</div>
			</Modal>
		</>
	);
};

export default SettingsDeleteAccount;
