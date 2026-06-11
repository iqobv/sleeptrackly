import { IsStrongPassword, ValidationOptions } from 'class-validator';

export function IsPassword(
	validationOptions?: ValidationOptions,
): PropertyDecorator {
	return IsStrongPassword(
		{
			minLength: 8,
			minLowercase: 1,
			minUppercase: 1,
			minNumbers: 1,
			minSymbols: 0,
		},
		{
			message:
				'Password is not strong enough. It must be at least 8 characters long and include lowercase, uppercase, and numeric characters.',
			...validationOptions,
		},
	);
}
