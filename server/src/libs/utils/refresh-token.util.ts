export const splitToken = (
	token: string,
): { sessionId: string; rawToken: string } => {
	const [sessionId, rawToken] = token.split('.');

	if (!sessionId || !rawToken) {
		throw new Error('Invalid token format');
	}

	return { sessionId, rawToken };
};

export const createRefreshToken = (
	sessionId: string,
	rawToken: string,
): string => `${sessionId}.${rawToken}`;
