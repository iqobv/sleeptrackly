export const QrLoginStatus = {
	PENDING: 'pending',
	APPROVED: 'approved',
	EXPIRED: 'expired',
} as const;
export type QrLoginStatus = (typeof QrLoginStatus)[keyof typeof QrLoginStatus];

type QrStatusApproved = {
	status: 'approved';
	userId: string;
	tokenId: string;
};

type QrStatusPending = {
	status: 'pending';
};

type QrStatusExpired = {
	status: 'expired';
	error: string;
};

export type QrLoginStatusResult =
	| QrStatusApproved
	| QrStatusPending
	| QrStatusExpired;
