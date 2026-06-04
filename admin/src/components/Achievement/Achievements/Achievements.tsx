'use client';

import { getAllAchievements } from '@/api';
import { Button, SectionHeader } from '@/components/UI';
import { PAGES, QUERY_KEYS } from '@/config';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { MdAdd } from 'react-icons/md';
import { AchievementCard } from './AchievementCard';
import styles from './Achievements.module.scss';
import { AchievementsListLoader } from './AchievementsLoader';

export const Achievements = () => {
	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEYS.achievement.all,
		queryFn: getAllAchievements,
	});

	return (
		<div className={styles.achievements}>
			<div className={styles.header}>
				<SectionHeader title="Achievements" padding={0} />
				<Button asChild isIcon>
					<Link href={PAGES.ACHIEVEMENT_NEW}>
						<MdAdd />
						<span className={styles.text}>Add Achievement</span>
					</Link>
				</Button>
			</div>
			{isLoading && <AchievementsListLoader />}
			{data && data.length > 0 && (
				<div className={styles.list}>
					{data.map((achievement) => (
						<AchievementCard key={achievement.id} achievement={achievement} />
					))}
				</div>
			)}
		</div>
	);
};
