import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isFutureDate', async: false })
export class IsFutureDateConstraint implements ValidatorConstraintInterface {
	public validate(date: Date): boolean {
		if (!date || !(date instanceof Date)) return true;

		return date instanceof Date && date.getTime() > Date.now();
	}

	public defaultMessage(args: ValidationArguments): string {
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
