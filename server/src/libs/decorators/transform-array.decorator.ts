import { Transform } from 'class-transformer';

export function TransformArray<T = string>(
	mapFn: (val: unknown) => T = (val) => String(val).trim() as unknown as T,
): PropertyDecorator {
	return Transform(({ value }: { value: unknown }) => {
		if (typeof value === 'string') {
			try {
				const parsed: unknown = JSON.parse(value.replace(/'/g, '"'));

				if (Array.isArray(parsed)) {
					return parsed.map(mapFn);
				}
			} catch {
				if (value.includes(',')) {
					return value.split(',').map(mapFn);
				}
				return [mapFn(value)];
			}
		}

		if (Array.isArray(value)) {
			return value.map(mapFn);
		}

		return [];
	});
}
