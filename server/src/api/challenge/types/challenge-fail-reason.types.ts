export const ChallengeFailReason = {
	EXCEEDED_FROZEN_PERIOD: 'EXCEEDED_FROZEN_PERIOD',
	RESTORE_LIMIT_EXCEEDED: 'RESTORE_LIMIT_EXCEEDED',
	CONDITION_FAILED: 'CONDITION_FAILED',
} as const;

export type ChallengeFailReason =
	(typeof ChallengeFailReason)[keyof typeof ChallengeFailReason];
