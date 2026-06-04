import { Transform } from 'class-transformer';

export function TransformEnum<T>(
	mode: 'upper' | 'lower' = 'upper',
): PropertyDecorator {
	return Transform(({ value }): keyof T | Array<keyof T> => {
		const transform = (val: unknown): unknown => {
			if (typeof val !== 'string') return val;
			return mode === 'upper' ? val.toUpperCase() : val.toLowerCase();
		};

		if (Array.isArray(value)) {
			return value.map(transform) as Array<keyof T>;
		}

		return transform(value) as keyof T;
	});
}
