import { getAllAchievements } from '@/api';

export type Achievement = Awaited<
	ReturnType<typeof getAllAchievements>
>[number];
