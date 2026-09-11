export interface BaseMessage {
	code: string;
	message: string;
}

export interface MessageDetail<
	K extends string = string,
	V extends string = string,
> extends BaseMessage {
	code: K;
	message: V;
	field?: string;
	meta?: Record<string, unknown>;
}

export interface MessageResponse extends BaseMessage {
	field?: string;
	meta?: Record<string, unknown>;
}
