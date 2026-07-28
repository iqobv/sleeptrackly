export const CHALLENGE_TASK_ERROR_MESSAGES = {
	NOT_FOUND: 'Challenge task not found',
	ONLY_FAILED_TASKS_CAN_BE_RECOVERED:
		'Only failed challenge tasks can be recovered',
	RECOVERY_LIMIT_REACHED:
		'You have reached the maximum number of recoveries for this challenge',
	RECOVERY_NOT_AVAILABLE:
		'You cannot recover this challenge task at the moment',
	NOT_ENOUGH_RECOVERIES_LEFT: 'You do not have enough recoveries left',
} as const;
