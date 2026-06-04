export const FRIENDSHIP_ERROR_MESSAGES = {
	NOT_FOUND: 'Friendship not found',
	ALREADY_EXISTS: 'Friendship already exists',
	REQUESTS_DISABLED: 'This user is not accepting friend requests',
	REQUEST_COOLDOWN: 'You can send a new request after 24 hours',
	USER_BLOCKED: 'You are blocked by this user',
	STATUS_DUPLICATE: 'The friendship is already in this status',
	CANNOT_FRIEND_SELF: 'You cannot send a friend request to yourself',
} as const;
