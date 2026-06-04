export const PROMOTION_ERROR_MESSAGES = {
	NOT_FOUND: 'Promotion not found',
	PRODUCT_REQUIRED_PAYLOAD_MISSING:
		'Either coinsReward or productIdReward must be provided',
	ALREADY_EXISTS: 'Promotion with this alias already exists',
	HAS_EXPIRED: 'Promotion has expired',
	HAS_REACHED_ITS_USAGE_LIMIT: 'Promotion has reached its usage limit',
	ALREADY_USED_THIS_PROMOTION: 'You have already used this promotion',
} as const;
