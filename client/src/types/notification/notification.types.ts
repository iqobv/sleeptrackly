import { PaginatedDataResponse } from '../api/paginatedData.types';

export interface Notification {
	id: string;
	userId: string;
	isGlobal: boolean;
	isRead: boolean;
	isPush: boolean;
	showInApp: boolean;
	isScheduled: boolean;
	isEmail: boolean;
	title: string;
	body: string;
	redirectUrl: string;
	createdAt: Date;
	updatedAt: Date;
	scheduledAt: Date;
}

export type NotificationPaginated = PaginatedDataResponse<Notification>;
