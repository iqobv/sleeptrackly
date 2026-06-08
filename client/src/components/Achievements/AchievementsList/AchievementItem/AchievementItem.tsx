'use client';

import { CDNImage } from '@/components/UI';
import { Achievement } from '@/types';
import {
	GridItem,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	Typography,
} from '@shared/ui';
import clsx from 'clsx';
import { MdInfoOutline, MdLockOutline } from 'react-icons/md';
import styles from './AchievementItem.module.scss';

interface AchievementItemProps {
	achievement: Achievement;
}

export const AchievementItem = ({ achievement }: AchievementItemProps) => {
	const isAchieved = achievement.isAchieved;

	const classNames = clsx(
		styles.item,
		achievement.isAchieved && styles.achieved,
	);

	return (
		<GridItem className={classNames}>
			<div className={styles.imageWrapper}>
				<CDNImage
					path={achievement.iconUrl}
					alt={achievement.translation.title}
					className={styles.image}
				/>
				{!isAchieved && (
					<div className={styles.lockOverlay}>
						<MdLockOutline size={34} />
					</div>
				)}
			</div>
			<div className={styles.content}>
				<div className={styles.info}>
					<Typography>{achievement.translation.title}</Typography>
					<Typography color="secondary">
						{achievement.translation.description}
					</Typography>
				</div>
				{isAchieved && achievement.achievedAt && (
					<Tooltip>
						<TooltipTrigger asChild>
							<span style={{ display: 'inline-flex', cursor: 'pointer' }}>
								<MdInfoOutline />
							</span>
						</TooltipTrigger>
						<TooltipContent>
							<>
								<Typography variant="body2" color="muted">
									Achieved at:{' '}
									{new Date(achievement.achievedAt).toLocaleDateString()}
								</Typography>
								{achievement.rewardCoins > 0 && (
									<Typography variant="body2" color="muted">
										Coin Reward: {achievement.rewardCoins} coins
									</Typography>
								)}
								{achievement.rewardProductId && achievement.rewardProduct && (
									<Typography variant="body2" color="muted">
										Item Reward: {achievement.rewardProduct.name}
									</Typography>
								)}
							</>
						</TooltipContent>
					</Tooltip>
				)}
			</div>
		</GridItem>
	);
};
