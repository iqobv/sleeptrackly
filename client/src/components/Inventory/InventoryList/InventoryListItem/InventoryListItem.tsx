'use client';

import { env } from '@/env';
import { InventoryItem } from '@/types/inventory/inventory.types';
import { ItemType } from '@/types/item/itemType.types';
import { Button } from '@shared/ui';
import clsx from 'clsx';
import Image from 'next/image';
import styles from './InventoryListItem.module.scss';

interface InventoryListItemProps {
	item: InventoryItem;
	onEquip: () => void;
}

const cdnUrl = env.NEXT_PUBLIC_CDN_URL;

export const InventoryListItem = ({
	item,
	onEquip,
}: InventoryListItemProps) => {
	const isEquipped = item.isEquipped;

	return (
		<div className={clsx(styles.item, isEquipped && styles.equipped)}>
			<div className={styles.imageContainer}>
				{item.item.type === ItemType.ANIMATED_AVATAR ? (
					<video
						src={`${cdnUrl}/${item.item.mediaUrl}`}
						loop
						autoPlay
						muted
						width={150}
						height={150}
						className={styles.video}
					/>
				) : (
					<Image
						src={`${cdnUrl}/${item.item.mediaUrl}`}
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
						onClick={onEquip}
					>
						{isEquipped ? 'Unequip' : 'Equip'}
					</Button>
				</div>
			</div>
		</div>
	);
};
