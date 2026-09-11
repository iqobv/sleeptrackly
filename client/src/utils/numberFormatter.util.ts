export const formatNumber = (
	value: number,
	options?: Intl.NumberFormatOptions,
): string => {
	const formatter = new Intl.NumberFormat(undefined, options);
	return formatter.format(value);
};
