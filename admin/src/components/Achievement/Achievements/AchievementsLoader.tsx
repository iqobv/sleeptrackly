import { PageWrapperLoader } from '@/components/UI';
import { AchievementCardLoader } from './AchievementCard/AchievementCardLoader';
import styles from './Achievements.module.scss';

export const AchievementsListLoader = () => (
	<div className={styles.list}>
		{Array.from({ length: 6 }).map((_, i) => (
			<AchievementCardLoader key={i} />
		))}
	</div>
);

export const AchievementsLoader = () => (
	<PageWrapperLoader showRightButton>
		<AchievementsListLoader />
	</PageWrapperLoader>
);
