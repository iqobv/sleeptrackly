'use client';

import {
	deletePromotion,
	getAllPromotions,
} from '@/api/promotion/promotion.api';
import { PAGES } from '@/config/pages.config';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { Button, ConfirmModal } from '@shared/ui';
import { useMutation, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import styles from './PromotionsList.module.scss';
import { PromotionsListLoader } from './PromotionsListLoader';

export const PromotionsList = () => {
	const [promotionIdToDelete, setPromotionIdToDelete] = useState<string | null>(
		null,
	);

	const { data, isLoading, refetch } = useQuery({
		queryFn: getAllPromotions,
		queryKey: QUERY_KEYS.promotion.all,
	});

	const { mutate } = useMutation({
		mutationFn: (id: string) => deletePromotion(id),
		onSuccess: () => {
			toast.success('Promotion deleted successfully.');
			refetch();
			setPromotionIdToDelete(null);
		},
		onError: (error) => {
			toast.error(error.message || 'Failed to delete promotion.');
			setPromotionIdToDelete(null);
		},
	});

	const handleCloseModal = () => setPromotionIdToDelete(null);

	const handleConfirmDelete = () => {
		if (promotionIdToDelete) {
			mutate(promotionIdToDelete);
		}
	};

	if (isLoading) return <PromotionsListLoader />;
	if (!data || data.length === 0) return <p>No promotions found.</p>;

	return (
		<div className={styles.list}>
			{data.map((promotion) => (
				<div key={promotion.id} className={styles.item}>
					<Link href={PAGES.PROMOTION(promotion.id)} prefetch={false}>
						{promotion.alias}
					</Link>
					<Button
						isIcon
						variant="text"
						onClick={() => setPromotionIdToDelete(promotion.id)}
					>
						<MdDelete />
					</Button>
				</div>
			))}
			<ConfirmModal
				isOpen={promotionIdToDelete !== null}
				onClose={handleCloseModal}
				title="Delete Promotion"
				text="You are about to delete this promotion."
				onConfirm={handleConfirmDelete}
			/>
		</div>
	);
};
