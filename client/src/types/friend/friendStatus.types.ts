import { components } from '../schema';

type SwaggerFriendStatus = components['schemas']['FriendshipDto']['status'];

export const FriendStatus = {
	ACCEPTED: 'ACCEPTED',
	PENDING: 'PENDING',
	REJECTED: 'REJECTED',
	BLOCKED: 'BLOCKED',
} as const satisfies Record<SwaggerFriendStatus, SwaggerFriendStatus>;

export type FriendStatus = (typeof FriendStatus)[keyof typeof FriendStatus];
