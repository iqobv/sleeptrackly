import { BaseMessage } from '@libs/types/messages/message-detail.types';
import { Expose, Type } from 'class-transformer';
import { MessageMetaDto } from './message-metadata.dto';

export class MessageResponseDto implements BaseMessage {
	@Expose() code: string;
	@Expose() message: string;
	@Expose() field?: string;

	@Expose()
	@Type(() => MessageMetaDto)
	meta?: MessageMetaDto;

	constructor(partial?: Partial<MessageResponseDto>) {
		if (partial) Object.assign(this, partial);
	}
}
