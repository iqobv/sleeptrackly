'use client';

import { deleteCollection } from '@/api';
import { PAGES, QUERY_KEYS } from '@/config';
import { Button, ConfirmModal } from '@shared/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { toast } from 'react-toastify';

interface EditCollectionDeleteProps {
	id: string;
}

const EditCollectionDelete = ({ id }: EditCollectionDeleteProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const queryClient = useQueryClient();
	const router = useRouter();

	const { mutate } = useMutation({
		mutationFn: () => deleteCollection(id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.customization.collection.all,
			});
			router.push(PAGES.COLLECTIONS);
		},
		onError: (e) => toast.error(e.message || 'Failed to delete collection'),
	});

	return (
		<ConfirmModal
			isOpen={isOpen}
			onClose={() => setIsOpen((prev) => !prev)}
			onConfirm={mutate}
			text="Are you sure you want to delete this collection? This action cannot be undone."
			title="Delete Collection"
			trigger={
				<Button variant="contained" color="danger" isIcon isRounded size="sm">
					<MdDeleteOutline size={20} />
				</Button>
			}
		/>
	);
};

export default EditCollectionDelete;
