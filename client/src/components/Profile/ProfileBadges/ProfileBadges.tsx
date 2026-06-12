'use client';

import { CDNImage } from '@/components/UI';
import { EquippedItems } from '@/types/item/equippedItems.types';
import styles from './ProfileBadges.module.scss';

interface ProfileBadgesProps {
	badges: EquippedItems[];
}

export const ProfileBadges = ({ badges }: ProfileBadgesProps) => {
	return (
		<div className={styles.badges}>
			{badges.map((badge) => (
				<CDNImage
					key={badge.id}
					path={badge.item.mediaUrl}
					width={32}
					height={32}
					alt="badge"
				/>
			))}
		</div>
	);
};
