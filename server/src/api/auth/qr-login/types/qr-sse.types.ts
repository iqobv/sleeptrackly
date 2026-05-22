export interface QrSsePayload {
	qrId: string;
	status: string;
}

export interface QrSseEvent {
	data: {
		status: string;
	};
	type: string;
}
