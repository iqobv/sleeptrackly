'use client';

import { Button, CDNImage } from '@/components/UI';
import { PAGES } from '@/config';
import { FullAchievement } from '@/types';
import Link from 'next/link';
import { MdEdit } from 'react-icons/md';
import styles from './AchievementCard.module.scss';

interface AchievementCardProps {
	achievement: FullAchievement;
}

const AchievementCard = ({ achievement }: AchievementCardProps) => {
	const tags = [
		!achievement.isActive && 'Inactive',
		achievement.isHidden && 'Hidden',
	]
		.filter(Boolean)
		.join(', ');

	return (
		<div className={styles.card}>
			<div className={styles.infoWrapper}>
				<CDNImage src={achievement.iconUrl} width={48} height={48} />
				<div className={styles.info}>
					<p>Type: {achievement.type}</p>
					<p>Value: {achievement.targetValue}</p>
					{tags && <p>Tags: {tags}</p>}
				</div>
			</div>
			<Button asChild isIcon isRounded variant="text">
				<Link href={PAGES.ACHIEVEMENT(achievement.id)}>
					<MdEdit />
				</Link>
			</Button>
		</div>
	);
};

export default AchievementCard;
