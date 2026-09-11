import { IsEnum, IsString, IsUUID } from 'class-validator';

export const QrLoginStatus = {
	PENDING: 'pending',
	APPROVED: 'approved',
	EXPIRED: 'expired',
} as const;

export type QrLoginStatus = (typeof QrLoginStatus)[keyof typeof QrLoginStatus];

export const QrLoginStatusResponse = {
	...QrLoginStatus,
	SUCCESS: 'success',
} as const;

export type QrLoginStatusResponse =
	(typeof QrLoginStatusResponse)[keyof typeof QrLoginStatusResponse];

export abstract class QrLoginStatusResultBase {
	@IsEnum(QrLoginStatus)
	status: QrLoginStatus;
}

export class BaseQrStatus<T extends QrLoginStatusResponse> {
	status: T;
}

export class QrStatusApproved extends QrLoginStatusResultBase {
	status: typeof QrLoginStatus.APPROVED = QrLoginStatus.APPROVED;

	@IsUUID('4') userId: string;
	@IsString() tokenId: string;
}

export type QrStatusPending = {
	status: 'pending';
};

export type QrStatusExpired = {
	status: 'expired';
	error: string;
};

export type QrLoginStatusResult =
	QrStatusApproved | QrStatusPending | QrStatusExpired;
