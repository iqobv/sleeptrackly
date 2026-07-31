'use client';

import { Button, ButtonProps, ConfirmModal } from '@shared/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';

interface DeleteButtonProps {
	id: string;
	mutationFn: (id: string) => Promise<unknown>;
	onSuccessNavigateTo?: string;
	queryInvalidateKey: unknown[] | readonly unknown[];
	text: string;
	title: string;
	buttonProps?: Omit<ButtonProps, 'onClick' | 'children'>;
}

export const DeleteButton = ({
	id,
	mutationFn,
	onSuccessNavigateTo,
	queryInvalidateKey,
	text,
	title,
	buttonProps,
}: DeleteButtonProps) => {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {
		variant = 'text',
		color = 'danger',
		isIcon = true,
		isRounded = true,
		...restButtonProps
	} = buttonProps || {};

	const [open, setOpen] = useState(false);

	const { mutate } = useMutation({
		mutationFn: () => mutationFn(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryInvalidateKey });
			handleClose();
			if (onSuccessNavigateTo) router.push(onSuccessNavigateTo);
		},
	});

	const handleClose = () => setOpen((prev) => !prev);

	return (
		<>
			<Button
				variant={variant}
				color={color}
				isIcon={isIcon}
				isRounded={isRounded}
				onClick={handleClose}
				{...restButtonProps}
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
