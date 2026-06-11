'use client';

import { getAllAchievements } from '@/api/achievement/getAllAchievements.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { Grid } from '@shared/ui';
import { useQuery } from '@tanstack/react-query';
import { AchievementItem } from './AchievementItem/AchievementItem';
import styles from './AchievementsList.module.scss';

export const AchievementsList = () => {
	const { data } = useQuery({
		queryKey: QUERY_KEYS.achievement.all,
		queryFn: getAllAchievements,
	});

	if (!data) return null;

	return (
		<Grid className={styles.list} columns={2} gap={16}>
			{data.map((achievement) => (
				<AchievementItem key={achievement.id} achievement={achievement} />
			))}
		</Grid>
	);
};
