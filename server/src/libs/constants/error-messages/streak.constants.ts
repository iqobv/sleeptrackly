export const STREAK_ERROR_MESSAGES = {
	NO_ACTIVE_STREAK: 'No active streak found for the user',
	NO_STREAK_TO_RESTORE: 'No streak available to restore',
	NOT_ENOUGH_RESTORES: 'User has no restores left',
	ALREADY_ENDED: 'Streak has already ended',
	ALREADY_FROZEN: 'Streak is already frozen',
	ALREADY_ACTIVE: 'Streak is already active',
	STREAK_NOT_FROZEN: 'You can only restore a streak that is currently frozen',
} as const;
