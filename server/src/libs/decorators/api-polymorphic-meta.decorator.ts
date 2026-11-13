import { applyDecorators, Type } from '@nestjs/common';
import { ApiPropertyOptional, getSchemaPath } from '@nestjs/swagger';
import { plainToInstance, Transform } from 'class-transformer';

export function ApiPolymorphicMeta(
	metaMap: Record<string, Type<unknown>>,
): PropertyDecorator {
	const models = Object.values(metaMap).filter(Boolean);

	const oneOf = models.map((model) => ({ $ref: getSchemaPath(model.name) }));

	return applyDecorators(
		ApiPropertyOptional({
			oneOf,
			discriminator: {
				propertyName: 'type',
			},
			additionalProperties: false,
		}),

		Transform(({ value, obj }) => {
			if (!value || typeof value !== 'object') return null;

			const DtoClass = metaMap[obj.type];
			if (!DtoClass) return null;

			return plainToInstance(DtoClass, value);
		}),
	);
}
