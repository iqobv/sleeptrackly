'use client';

import { ConfirmModal } from '@/components/UI';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SettingsSecurityField } from '../SettingsSecurityField/SettingsSecurityField';

import { deleteAccount } from '@/api';
import { QUERY_KEYS } from '@/config';

export const SettingsDeleteAccount = () => {
	const router = useRouter();

	const [isOpen, setIsOpen] = useState(false);

	const handleClose = () => setIsOpen(!isOpen);

	const { mutate } = useMutation({
		mutationFn: deleteAccount,
		mutationKey: QUERY_KEYS.auth.deleteAccount,
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
