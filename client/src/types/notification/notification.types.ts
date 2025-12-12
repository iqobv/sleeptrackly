import { IPaginatedDateResponse } from '../api/paginatedDate.types';

export interface INotification {
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

export type TNotificationPaginated = IPaginatedDateResponse<INotification>;
