'use client';

import { getAllAchievements } from '@/api/achievement/getAllAchievements.api';
import { PageWrapper } from '@/components/UI';
import { PAGES } from '@/config/pages.config';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { useQuery } from '@tanstack/react-query';
import { AchievementCard } from './AchievementCard/AchievementCard';
import styles from './Achievements.module.scss';
import { AchievementsListLoader } from './AchievementsLoader';

export const Achievements = () => {
	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.achievement.all,
		queryFn: getAllAchievements,
	});

	return (
		<PageWrapper
			title="Achievements"
			description="List of all achievements in the system"
			buttonText="Create Achievement"
			showBackButton={false}
			href={PAGES.ACHIEVEMENT_NEW}
		>
			{isLoading && <AchievementsListLoader />}
			{data && data.length > 0 && (
				<div className={styles.list}>
					{data.map((achievement) => (
						<AchievementCard key={achievement.id} achievement={achievement} />
					))}
				</div>
			)}
		</PageWrapper>
	);
};
