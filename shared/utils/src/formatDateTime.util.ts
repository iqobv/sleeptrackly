const formattersCache = new Map<string, Intl.DateTimeFormat>();

export const getFormatter = (
	options?: Intl.DateTimeFormatOptions,
): Intl.DateTimeFormat => {
	const cacheKey = options ? JSON.stringify(options) : 'default';

	if (!formattersCache.has(cacheKey)) {
		formattersCache.set(
			cacheKey,
			new Intl.DateTimeFormat(
				undefined,
				options || {
					day: '2-digit',
					month: '2-digit',
					year: 'numeric',
					hour: '2-digit',
					minute: '2-digit',
				},
			),
		);
	}

	const formatter = formattersCache.get(cacheKey);

	if (!formatter) {
		throw new Error('Failed to instantiate Intl formatter');
	}

	return formatter;
};

export const formatDate = (
	dateInput: string | Date | number,
	options?: Intl.DateTimeFormatOptions,
): string => {
	const date = new Date(dateInput);

	if (Number.isNaN(date.getTime())) return '';

	const formatter = getFormatter(options);

	return formatter.format(date);
};
