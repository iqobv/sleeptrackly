export const AUTH_ERROR_MESSAGES = {
	UNAUTHORIZED: 'Unauthorized',
	INVALID_CREDENTIALS: 'Invalid email or password',
	EMAIL_NOT_VERIFIED: 'Email not verified',
	TOKEN_EXPIRED: 'Token has expired',
	TOKEN_MISMATCH: 'Token mismatch',
	TOKEN_INVALID: 'Invalid or expired refresh token',
	ACCOUNT_SUSPENDED: 'Account is deleted. You can still restore it',
	ACCOUNT_DELETED: 'Account is deleted',
	INVALID_GOOGLE_TOKEN: 'Invalid Google token',
	NO_EMAIL_ASSOCIATED: 'No email associated with this account',
	INVALID_REFRESH_TOKEN:
		'Invalid or expired refresh token. Please log in again.',
	REFRESH_TOKEN_MISSING: 'Refresh token is missing',
	REFRESH_TOKEN_REQUIRED: 'Refresh token is required',
	FORBIDDEN: 'Forbidden',
	INVALID_SESSION: 'Invalid session',
} as const;
