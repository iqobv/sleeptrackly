'use client';

import { deletePromotion } from '@/api';
import { PAGES, QUERY_KEYS } from '@/config';
import { Button, ConfirmModal } from '@shared/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { toast } from 'react-toastify';

interface EditPromotionDeleteProps {
	id: string;
}

export const EditPromotionDelete = ({ id }: EditPromotionDeleteProps) => {
	const router = useRouter();
	const qeuryClient = useQueryClient();

	const [isModalOpen, setIsModalOpen] = useState(false);

	const { mutate } = useMutation({
		mutationFn: () => deletePromotion(id),
		onSuccess: () => {
			qeuryClient.invalidateQueries({ queryKey: QUERY_KEYS.promotion.all });
			router.push(PAGES.PROMOTIONS);
		},
		onError: (error) => {
			toast.error(error.message || 'Failed to delete promotion.');
		},
	});

	return (
		<>
			<Button
				onClick={() => setIsModalOpen(true)}
				variant="text"
				color="danger"
				isIcon
				isRounded
			>
				<MdDeleteOutline size={20} />
			</Button>
			<ConfirmModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen((prev) => !prev)}
				onConfirm={mutate}
				text="Are you sure you want to delete this promotion? This action cannot be undone."
				title="Delete Promotion"
			/>
		</>
	);
};
