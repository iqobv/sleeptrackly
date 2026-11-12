import { MessageMetaDto } from '@libs/dto/message-metadata.dto';

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
	meta?: MessageMetaDto;
}

export interface MessageResponse extends BaseMessage {
	field?: string;
	meta?: MessageMetaDto;
}
