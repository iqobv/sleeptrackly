export const createSearchParams = <T extends Record<string, unknown>>(
	dto: T,
) => {
	const searchParams = new URLSearchParams();

	for (const key in dto) {
		if (Object.prototype.hasOwnProperty.call(dto, key)) {
			const value = dto[key];

			if (value !== undefined && value !== null) {
				if (Array.isArray(value)) {
					value.forEach((item) => {
						if (item !== null && item !== undefined) {
							searchParams.append(key, String(item));
						}
					});
				} else {
					searchParams.append(key, String(value));
				}
			}
		}
	}

	return searchParams;
};
