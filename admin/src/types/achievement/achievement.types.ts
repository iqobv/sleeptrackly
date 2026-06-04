import { getAchievementById, getAllAchievements } from '@/api';

export type Achievement = Awaited<
	ReturnType<typeof getAllAchievements>
>[number];
export type FullAchievement = Awaited<ReturnType<typeof getAchievementById>>;
