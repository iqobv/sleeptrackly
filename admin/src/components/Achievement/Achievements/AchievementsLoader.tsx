import { SkeletonLoader } from '@/components/UI';
import AchievementCardLoader from './AchievementCard/AchievementCardLoader';
import styles from './Achievements.module.scss';

export const AchievementsListLoader = () => {
	return (
		<div className={styles.list}>
			{Array.from({ length: 6 }).map((_, i) => (
				<AchievementCardLoader key={i} />
			))}
		</div>
	);
};

export const AchievementsLoader = () => {
	return (
		<div className={styles.achievements}>
			<div className={styles.header}>
				<SkeletonLoader width={210} height={37} />
				<SkeletonLoader width={44} height={44} />
			</div>
			<AchievementsListLoader />
		</div>
	);
};
