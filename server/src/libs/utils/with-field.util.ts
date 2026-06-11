import { MessageDetail } from "@libs/types/messages/message-detail.types";

export const withField = <T extends MessageDetail>(
	message: T,
	field: string,
): T & { field: string } => {
	return {
		...message,
		field,
	};
};
