import { getAchievementById } from '@/api/achievement/getAchievementById.api';
import { getAllAchievements } from '@/api/achievement/getAllAchievements.api';

export type Achievement = Awaited<
	ReturnType<typeof getAllAchievements>
>[number];
export type FullAchievement = Awaited<ReturnType<typeof getAchievementById>>;
