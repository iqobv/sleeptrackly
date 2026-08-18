import { components } from '@shared/types';

type SwaggerType = components['schemas']['AchievementType'];

export const AchievementType = {
	SLEEP_COUNT: 'SLEEP_COUNT',
	ITEMS_PURCHASED: 'ITEMS_PURCHASED',
	FRIENDS_COUNT: 'FRIENDS_COUNT',
	CHALLENGES_COMPLETED: 'CHALLENGES_COMPLETED',
	CHALLENGES_TASKS_COMPLETED: 'CHALLENGES_TASKS_COMPLETED',
} as const satisfies Record<SwaggerType, SwaggerType>;

export type AchievementType =
	(typeof AchievementType)[keyof typeof AchievementType];
