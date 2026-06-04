export const NotificationType = {
	FRIEND_REQUEST: 'FRIEND_REQUEST',
	SANCTION: 'SANCTION',
	WEEKLY_SUMMARY: 'WEEKLY_SUMMARY',
	INFORMATION: 'INFORMATION',
	MAINTENANCE: 'MAINTENANCE',
	UPDATE: 'UPDATE',
	PERSONAL_MESSAGE: 'PERSONAL_MESSAGE',
	MARKETING: 'MARKETING',
	OTHER: 'OTHER',
} as const;

export type NotificationType =
	(typeof NotificationType)[keyof typeof NotificationType];
