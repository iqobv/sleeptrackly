import { components } from '@shared/types';

type SwaggerNotificationType = components['schemas']['NotificationType'];

export const NotificationType = {
	ACHIEVEMENT_UNLOCKED: 'ACHIEVEMENT_UNLOCKED',
	FRIEND_REQUEST: 'FRIEND_REQUEST',
	SANCTION: 'SANCTION',
	WEEKLY_SUMMARY: 'WEEKLY_SUMMARY',
	INFORMATION: 'INFORMATION',
	MAINTENANCE: 'MAINTENANCE',
	UPDATE: 'UPDATE',
	PERSONAL_MESSAGE: 'PERSONAL_MESSAGE',
	MARKETING: 'MARKETING',
	OTHER: 'OTHER',
} as const satisfies Record<SwaggerNotificationType, SwaggerNotificationType>;

export type NotificationType =
	(typeof NotificationType)[keyof typeof NotificationType];
