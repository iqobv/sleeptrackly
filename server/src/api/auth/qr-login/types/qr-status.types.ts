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
