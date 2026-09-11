import { parseAsIndex, parseAsInteger, parseAsStringEnum } from 'nuqs/server';

export const createStringEnumParser = <T extends Record<string, string>>(
	obj: T,
	defaultValue?: T[keyof T] | null,
) => {
	const values = Object.values(obj) as [T[keyof T], ...T[keyof T][]];
	const parser = parseAsStringEnum(values);

	return defaultValue ? parser.withDefault(defaultValue) : parser;
};

export const createOptionalStringEnumParser = <
	T extends Record<string, string>,
>(
	obj: T,
) => {
	const values = Object.values(obj) as [T[keyof T], ...T[keyof T][]];
	return parseAsStringEnum(values);
};

export const createTableParsers = <
	TBy extends Record<string, string>,
	TOrder extends Record<string, string>,
	TExtraParsers extends Record<string, unknown> = Record<string, never>,
>(
	sortByObj: TBy,
	defaultSortBy: TBy[keyof TBy] | null,
	sortOrderObj: TOrder,
	defaultSortOrder: TOrder[keyof TOrder] | null,
	additionalParsers: TExtraParsers = {} as TExtraParsers,
) => {
	const baseParsers = {
		page: parseAsIndex.withDefault(0),
		limit: parseAsInteger.withDefault(20),
		sortBy: createStringEnumParser(sortByObj, defaultSortBy),
		sortOrder: createStringEnumParser(sortOrderObj, defaultSortOrder),
	};

	return {
		...baseParsers,
		...additionalParsers,
	} as typeof baseParsers & TExtraParsers;
};
