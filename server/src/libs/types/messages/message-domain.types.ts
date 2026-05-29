import { MessageDetail } from './message-detail.types';

export type MessageDomain<T extends Record<string, string>> = {
	[K in keyof T & string]: MessageDetail<K, T[K]>;
};
