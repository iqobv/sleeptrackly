'use client';

import { EquippedItems } from '@/types';

import { CDNImage } from '@/components/UI';
import styles from './ProfileBadges.module.scss';

interface ProfileBadgesProps {
	badges: EquippedItems[];
}

const ProfileBadges = ({ badges }: ProfileBadgesProps) => {
	return (
		<div className={styles['profile-badges']}>
			{badges.map((badge) => (
				<CDNImage
					key={badge.id}
					src={badge.item.mediaUrl}
					width={32}
					height={32}
					alt="badge"
				/>
			))}
		</div>
	);
};

export default ProfileBadges;
