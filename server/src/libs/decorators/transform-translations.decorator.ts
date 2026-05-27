import { plainToInstance, Transform } from 'class-transformer';

export function TransformTranslations<T>(
	classConstructor: new () => T,
): PropertyDecorator {
	return Transform(({ value }: { value: unknown }): T[] => {
		if (!value) {
			return [];
		}

		let parsedValue: unknown = value;

		if (typeof value === 'string') {
			try {
				parsedValue = JSON.parse(value);
			} catch {
				return [];
			}
		}

		const arrayValue = Array.isArray(parsedValue) ? parsedValue : [parsedValue];

		const normalizedArray = arrayValue.map((item: unknown) => {
			if (typeof item === 'string') {
				try {
					return JSON.parse(item) as unknown;
				} catch {
					return {};
				}
			}
			return item;
		});

		return plainToInstance(classConstructor, normalizedArray);
	});
}
