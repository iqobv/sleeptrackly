'use client';

import { deleteAccount } from '@/api/auth/auth.api';
import { ConfirmModal } from '@shared/ui';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SettingsSecurityField } from '../SettingsSecurityField/SettingsSecurityField';

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
		<>
			<SettingsSecurityField
				action={handleClose}
				label="Delete account"
				buttonText="Delete"
				isImportant
			/>
			<ConfirmModal
				isOpen={isOpen}
				onClose={handleClose}
				onConfirm={handleDelete}
				title="Delete account"
				text="You sure you want to delete your account? If you delete your
						account, all of your data will be permanently removed from our
						servers forever. This action cannot be undone."
			/>
		</>
	);
};
