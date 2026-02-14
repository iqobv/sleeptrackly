export const parseSearchParams = (
	query: Record<string, unknown>,
): URLSearchParams => {
	const params = new URLSearchParams(
		Object.entries(query).map(([key, value]) => [key, String(value)]),
	);

	return params;
};
