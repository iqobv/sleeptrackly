import { MessageDetail } from './message-detail.types';

export type MessageDomain<
	T extends Record<string, string>,
	P extends string = '',
> = {
	[K in keyof T & string]: MessageDetail<P extends '' ? K : `${P}_${K}`, T[K]>;
};
