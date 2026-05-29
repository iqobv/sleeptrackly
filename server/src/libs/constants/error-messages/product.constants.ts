export const PRODUCT_ERROR_MESSAGES = {
	NOT_FOUND: 'Product not found',
	ALREADY_EXISTS: 'Product already exists',
	REQUIRED_PAYLOAD_MISSING: 'Either itemId or bundleId must be provided',
	MUTUALLY_EXCLUSIVE_PAYLOAD:
		'Both itemId and bundleId cannot be provided simultaneously',
	EXPIRES_AT_INVALID_FUTURE: 'expiresAt must be a future date',
} as const;
