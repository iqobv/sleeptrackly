'use client';

import { Button, ConfirmModal } from '@shared/ui';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface DeleteButtonProps {
	id: string;
	mutationFn: (id: string) => Promise<unknown>;
	onSuccessNavigateTo: string;
}

const DeleteButton = ({
	id,
	mutationFn,
	onSuccessNavigateTo,
}: DeleteButtonProps) => {
	const router = useRouter();

	const [open, setOpen] = useState(false);

	const { mutate } = useMutation({
		mutationFn: () => mutationFn(id),
		onSuccess: () => {
			handleClose();
			router.push(onSuccessNavigateTo);
			router.refresh();
		},
	});

	const handleClose = () => setOpen((prev) => !prev);

	return (
		<div>
			<Button onClick={handleClose} variant="contained" color="danger">
				Delete
			</Button>
			<ConfirmModal
				isOpen={open}
				onClose={handleClose}
				onConfirm={mutate}
				text="Are you sure you want to delete this item? This action cannot be undone."
				title="Confirm Deletion"
			/>
		</div>
	);
};

export default DeleteButton;
