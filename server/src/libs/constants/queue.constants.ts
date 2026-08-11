export const QUEUE_NAME = {
	ACHIEVEMENTS: 'achievements',
	CHALLENGES: 'challenges',
	WEEKLY_SUMMARY: 'weekly-summaries',
	NOTIFICATIONS: 'notifications',
} as const;

export const QUEUE_JOB_NAME = {
	ACHIEVEMENTS: {
		PROCCESS: 'process-achievement',
	},
	WEEKLY_SUMMARY: {
		RECALCULATE: 'recalculate-weekly-summary',
	},
	CHALLENGES: {
		PROCCESS: 'process-challenge',
	},
	NOTIFICATIONS: {
		CREATE: 'create-notification',
		DIRECT_PUSH: 'direct-push-notification',
	},
} as const;
