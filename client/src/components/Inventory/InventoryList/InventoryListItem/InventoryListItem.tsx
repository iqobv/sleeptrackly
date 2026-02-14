'use client';

import { equipInventoryItem } from '@/api';
import { Button } from '@/components/UI';
import { ITEM_TYPES } from '@/constants';
import { IInventory } from '@/types';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './InventoryListItem.module.scss';

interface InventoryListItemProps {
	item: IInventory;
	refetch?: () => void;
}

const InventoryListItem = ({ item, refetch }: InventoryListItemProps) => {
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
		<div
			className={`${styles['inventory-item']} ${isEquipped ? styles['inventory-item--equipped'] : ''}`}
		>
			<div className={styles['inventory-item__image-container']}>
				{item.item.type === ITEM_TYPES.ANIMATED_AVATAR ? (
					<video
						src={`${process.env.NEXT_PUBLIC_CDN_URL}/${item.item.mediaUrl}`}
						loop
						autoPlay
						muted
						width={150}
						height={150}
						className={styles['inventory-item__video']}
					/>
				) : (
					<Image
						src={`${process.env.NEXT_PUBLIC_CDN_URL}/${item.item.mediaUrl}`}
						alt={item.item.translation.name}
						width={150}
						height={150}
						className={styles['inventory-item__image']}
					/>
				)}
				{isEquipped && (
					<div className={styles['inventory-item__equipped-badge']}>
						Equipped
					</div>
				)}
			</div>
			<div className={styles['inventory-item__details']}>
				<div className={styles['inventory-item__info']}>
					<h3 className={styles['inventory-item__name']}>
						{item.item.translation.name}
					</h3>
					<p className={styles['inventory-item__type']}>
						{item.item.type.replaceAll('_', ' ')}
					</p>
				</div>
				<div className={styles['inventory-item__actions']}>
					<Button
						size="sm"
						fullWidth
						variant={isEquipped ? 'secondary' : 'contained'}
						onClick={() => mutate()}
					>
						{isEquipped ? 'Unequip' : 'Equip'}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default InventoryListItem;
