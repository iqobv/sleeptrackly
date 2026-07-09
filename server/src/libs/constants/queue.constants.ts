export const QUEUE_NAME = {
	ACHIEVEMENTS: 'achievements',
	CHALLENGES: 'challenges',
	WEEKLY_SUMMARY: 'weekly-summaries',
} as const;

export const QUEUE_JOB_NAME = {
	ACHIEVEMENTS: {
		PROCCESS: 'process-achievement',
	},
	WEEKLY_SUMMARY: {
		RECALCULATE: 'recalculate-weekly-summary',
	},
} as const;
