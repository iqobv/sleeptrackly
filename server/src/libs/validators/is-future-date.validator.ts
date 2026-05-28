import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isFutureDate', async: false })
export class IsFutureDateConstraint implements ValidatorConstraintInterface {
	validate(date: Date) {
		return date instanceof Date && date.getTime() > Date.now();
	}

	defaultMessage(args: ValidationArguments) {
		return `${args.property} must be a future date`;
	}
}

export function IsFutureDate(validationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: IsFutureDateConstraint,
		});
	};
}
