export const TaskFailReason = {
	TIMEOUT: 'TIMEOUT',
	CONDITION_FAILED: 'CONDITION_FAILED',
} as const;

export type TaskFailReason =
	(typeof TaskFailReason)[keyof typeof TaskFailReason];
