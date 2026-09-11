export interface SignalPayload {
	userId: string | null;
	timestamp: number;
}

export interface SseSignalEvent {
	data: {
		action: string;
		timestamp: number;
	};
	type: string;
}
