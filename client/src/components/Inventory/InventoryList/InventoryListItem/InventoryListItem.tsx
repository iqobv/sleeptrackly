'use client';

import { equipInventoryItem } from '@/api';
import { Button } from '@/components/UI';
import { InventoryItem, ItemType } from '@/types';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './InventoryListItem.module.scss';

interface InventoryListItemProps {
	item: InventoryItem;
	refetch?: () => void;
}

export const InventoryListItem = ({
	item,
	refetch,
}: InventoryListItemProps) => {
	const [isEquipped, setIsEquipped] = useState(item.isEquipped);

	const { mutate } = useMutation({
		mutationFn: () => equipInventoryItem(item.id),
		mutationKey: ['equipItem', item.id],
		onMutate: () => {
			setIsEquipped((prev) => !prev);
		},
		onError: () => {
			setIsEquipped((prev) => !prev);
		},
		onSuccess: (data) => {
			setIsEquipped(data.isEquipped);
			if (refetch) {
				refetch();
			}
		},
	});

	useEffect(() => {
		setIsEquipped(item.isEquipped);
	}, [item]);

	return (
		<div className={`${styles.item} ${isEquipped ? styles.equipped : ''}`}>
			<div className={styles.imageContainer}>
				{item.item.type === ItemType.ANIMATED_AVATAR ? (
					<video
						src={`${process.env.NEXT_PUBLIC_CDN_URL}/${item.item.mediaUrl}`}
						loop
						autoPlay
						muted
						width={150}
						height={150}
						className={styles.video}
					/>
				) : (
					<Image
						src={`${process.env.NEXT_PUBLIC_CDN_URL}/${item.item.mediaUrl}`}
						alt={item.item.translation.name}
						width={150}
						height={150}
						className={styles.image}
					/>
				)}
				{isEquipped && <div className={styles.equippedBadge}>Equipped</div>}
			</div>
			<div className={styles.details}>
				<div className={styles.info}>
					<h3 className={styles.name}>{item.item.translation.name}</h3>
					<p className={styles.type}>{item.item.type.replaceAll('_', ' ')}</p>
				</div>
				<div className={styles.actions}>
					<Button
						size="sm"
						fullWidth
						variant="contained"
						color={isEquipped ? 'secondary' : 'primary'}
						onClick={() => mutate()}
					>
						{isEquipped ? 'Unequip' : 'Equip'}
					</Button>
				</div>
			</div>
		</div>
	);
};
