export const USER_ERROR_MESSAGES = {
	NOT_FOUND: 'User not found',
	ALREADY_EXISTS: 'User already exists',
	USERNAME_ALREADY_TAKEN: 'Username already taken',
	OLD_PASSWORD_MISMATCH: 'Old password does not match',
	NEW_PASSWORD_SAME_AS_OLD:
		'New password cannot be the same as the old password',
	ACCOUNT_DELETED: 'Account has been deleted',
	USERNAME_CHANGE_BANNED: 'You are banned from changing username',
} as const;
