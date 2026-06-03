import { components } from '../schema';

type SwaggerNotificationType = components['schemas']['NotificationType'];

export const NotificationType = {
	ACHIEVEMENT_UNLOCKED: 'ACHIEVEMENT_UNLOCKED',
	FRIEND_REQUEST: 'FRIEND_REQUEST',
	INFORMATION: 'INFORMATION',
	MAINTENANCE: 'MAINTENANCE',
	OTHER: 'OTHER',
	MARKETING: 'MARKETING',
	WEEKLY_SUMMARY: 'WEEKLY_SUMMARY',
	PERSONAL_MESSAGE: 'PERSONAL_MESSAGE',
	SANCTION: 'SANCTION',
	UPDATE: 'UPDATE',
} as const satisfies Record<SwaggerNotificationType, SwaggerNotificationType>;

export type NotificationType =
	(typeof NotificationType)[keyof typeof NotificationType];
