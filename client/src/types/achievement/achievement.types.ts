import { getAllAchievements } from '@/api/achievement/getAllAchievements.api';

export type Achievement = Awaited<
	ReturnType<typeof getAllAchievements>
>[number];
