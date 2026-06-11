'use client';

import { Button, ConfirmModal } from '@shared/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';

interface DeleteButtonProps {
	id: string;
	mutationFn: (id: string) => Promise<unknown>;
	onSuccessNavigateTo: string;
	queryInvalidateKey: unknown[] | readonly unknown[];
	text: string;
	title: string;
}

export const DeleteButton = ({
	id,
	mutationFn,
	onSuccessNavigateTo,
	queryInvalidateKey,
	text,
	title,
}: DeleteButtonProps) => {
	const router = useRouter();
	const queryClient = useQueryClient();

	const [open, setOpen] = useState(false);

	const { mutate } = useMutation({
		mutationFn: () => mutationFn(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryInvalidateKey });
			handleClose();
			router.push(onSuccessNavigateTo);
		},
	});

	const handleClose = () => setOpen((prev) => !prev);

	return (
		<>
			<Button
				onClick={handleClose}
				variant="text"
				color="danger"
				isIcon
				isRounded
			>
				<MdDeleteOutline size={22} />
			</Button>
			<ConfirmModal
				isOpen={open}
				onClose={handleClose}
				onConfirm={mutate}
				text={text}
				title={title}
			/>
		</>
	);
};
