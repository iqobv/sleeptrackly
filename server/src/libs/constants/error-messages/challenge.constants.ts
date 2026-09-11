export const CHALLENGE_ERROR_MESSAGES = {
	NOT_FOUND: 'Challenge not found',
	START_DATE_PAST: 'Start date cannot be in the past',
	END_DATE_PAST: 'End date cannot be in the past',
	INVALID_DATE_RANGE: 'End date must be after the start date',
	NOT_STARTED: 'Challenge has not started yet',
	ALREADY_ENDED: 'Challenge has already ended',
	NOT_AVAILABLE: 'Challenge is not available yet',
	ALREADY_PARTICIPATING: 'You are already participating in this challenge',
	NOT_PARTICIPATING: 'You are not participating in this challenge',
	TYPE_CANNOT_BE_CHANGED: 'Challenge type cannot be changed',
	NOT_FROZEN: 'Challenge is not frozen',
	ONLY_FAILED_TASKS_CAN_BE_RECOVERED:
		'Only failed challenge tasks can be recovered',
	RECOVERY_LIMIT_REACHED:
		'You have reached the maximum number of recoveries for this challenge',
	RECOVERY_NOT_AVAILABLE: 'You cannot recover this challenge at the moment',
	NOT_ENOUGH_RECOVERIES_LEFT: 'You do not have enough recoveries left',
} as const;
