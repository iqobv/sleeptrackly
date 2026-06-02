export interface MessageApiResponse {
	statusCode: number;
	code: string;
	message: string;
	field?: string;
	meta?: Record<string, unknown>;
}
