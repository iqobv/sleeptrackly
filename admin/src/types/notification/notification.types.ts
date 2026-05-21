import { PaginatedDataResponse } from '../api/paginatedData.types';
import { DefaultFields } from '../defaultFields.types';

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

export interface Notification extends DefaultFields {
	userId: string | null;
	weeklySleepSummaryId: string | null;
	type: NotificationType;
	isGlobal: boolean;
	isRead: boolean;
	isPush: boolean;
	showInApp: boolean;
	isScheduled: boolean;
	isEmail: boolean;
	title: string;
	body: string;
	redirectUrl: string;
	scheduledAt: Date;
}

export type NotificationPaginated = PaginatedDataResponse<Notification>;
