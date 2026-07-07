export type IsoDate = string | Date | number;

export const isValidDate = (date: Date): boolean => {
	return date instanceof Date && !isNaN(date.getTime());
};

export const isSameCalendarDay = (date1: Date, date2: Date): boolean => {
	if (!isValidDate(date1) || !isValidDate(date2)) {
		return false;
	}

	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	);
};

export const formatTimeRange = (start: IsoDate, end: IsoDate): string[] => {
	const startDate = new Date(start);
	const endDate = new Date(end);

	if (!isValidDate(startDate) || !isValidDate(endDate)) {
		throw new Error('Invalid date boundaries provided to formatTimeRange');
	}

	const options: Intl.DateTimeFormatOptions = {
		hour: 'numeric',
		minute: 'numeric',
	};

	if (isSameCalendarDay(startDate, endDate)) {
		const timeTransformer = new Intl.DateTimeFormat(undefined, options);
		return [timeTransformer.format(startDate), timeTransformer.format(endDate)];
	}

	const dateTransformer = new Intl.DateTimeFormat(undefined, {
		...options,
		day: 'numeric',
		month: 'short',
	});

	return [dateTransformer.format(startDate), dateTransformer.format(endDate)];
};
