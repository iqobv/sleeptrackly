import { ArrayPath, FieldValues, Path } from 'react-hook-form';

export const createPrefixBuilder = <T extends FieldValues>(
	prefix: string = '',
) => {
	return {
		p: (name: Path<T>): Path<T> => `${prefix}${name}` as unknown as Path<T>,
		ap: (name: Path<T>): ArrayPath<T> =>
			`${prefix}${name}` as unknown as ArrayPath<T>,
	};
};
