import { BaseMessage } from '@libs/types';
import { Expose } from 'class-transformer';

export class MessageResponseDto implements BaseMessage {
	@Expose() code: string;
	@Expose() message: string;
	@Expose() field?: string;
	@Expose() meta?: Record<string, unknown>;

	constructor(partial: Partial<MessageResponseDto>) {
		Object.assign(this, partial);
	}
}
