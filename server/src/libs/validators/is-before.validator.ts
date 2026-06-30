import {
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
	registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'isBefore', async: false })
export class IsBeforeConstraint implements ValidatorConstraintInterface {
	validate(propertyValue: unknown, args: ValidationArguments) {
		const relatedPropertyName = args.constraints[0] as string;
		const obj = args.object as Record<string, unknown>;
		const relatedValue = obj[relatedPropertyName];

		if (relatedValue === undefined || relatedValue === null) return true;

		if (propertyValue instanceof Date && relatedValue instanceof Date) {
			return propertyValue.getTime() < relatedValue.getTime();
		}

		return true;
	}

	defaultMessage(args: ValidationArguments) {
		return `${args.property} must be before ${args.constraints[0]}`;
	}
}

export function IsBefore(
	property: string,
	validationOptions?: ValidationOptions,
) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [property],
			validator: IsBeforeConstraint,
		});
	};
}
