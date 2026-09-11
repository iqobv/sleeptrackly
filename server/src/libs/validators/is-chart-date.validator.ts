import { Matches, ValidationOptions } from 'class-validator';

export function IsChartDate(
	validationOptions?: ValidationOptions,
): PropertyDecorator {
	return Matches(/^\d{4}-\d{2}-\d{2}$/, {
		message: validationOptions?.message || 'Date must be in YYYY-MM-DD format',
		...validationOptions,
	});
}
