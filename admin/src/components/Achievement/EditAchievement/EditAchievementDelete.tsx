'use client';

import { deleteAchievement } from '@/api';
import { PAGES, QUERY_KEYS } from '@/config';
import { Button, ConfirmModal } from '@shared/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { toast } from 'react-toastify';

interface EditAchievementDeleteProps {
	id: string;
}

export const EditAchievementDelete = ({ id }: EditAchievementDeleteProps) => {
	const router = useRouter();
	const qeuryClient = useQueryClient();

	const [isModalOpen, setIsModalOpen] = useState(false);

	const { mutate } = useMutation({
		mutationFn: () => deleteAchievement(id),
		onSuccess: () => {
			qeuryClient.invalidateQueries({ queryKey: QUERY_KEYS.achievement.all });
			router.push(PAGES.ACHIEVEMENTS);
		},
		onError: (error) => {
			toast.error(error.message || 'Failed to delete promotion.');
		},
	});

	const handleClick = () => setIsModalOpen((prev) => !prev);

	return (
		<>
			<Button
				color="danger"
				variant="text"
				isIcon
				isRounded
				onClick={handleClick}
			>
				<MdDeleteOutline size={20} />
			</Button>
			<ConfirmModal
				isOpen={isModalOpen}
				onClose={handleClick}
				onConfirm={mutate}
				text="Are you sure you want to delete this promotion? This action cannot be undone."
				title="Delete Promotion"
			/>
		</>
	);
};
