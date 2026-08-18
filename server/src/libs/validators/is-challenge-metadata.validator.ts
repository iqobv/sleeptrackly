import { ChallengeType } from '@generated/prisma/enums';
import { validateChallengeMetadata } from '@libs/utils/validate-challenge-metadata.util';
import {
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
	registerDecorator,
} from 'class-validator';

const METADATA_ERROR_KEY = Symbol('metadata_errors');

type ChallengeMetadataValidationObject = {
	type?: ChallengeType;
	[METADATA_ERROR_KEY]?: string[];
};

@ValidatorConstraint({ name: 'IsChallengeMetadata', async: false })
export class IsChallengeMetadataConstraint implements ValidatorConstraintInterface {
	public validate(metadata: unknown, args: ValidationArguments): boolean {
		if (!metadata) return true;

		const object = args.object as ChallengeMetadataValidationObject;

		if (!object.type) {
			object[METADATA_ERROR_KEY] = [
				'Challenge type is required to validate metadata',
			];
			return false;
		}

		const errors = validateChallengeMetadata(object.type, metadata);

		if (errors.length > 0) {
			object[METADATA_ERROR_KEY] = errors;
			return false;
		}

		return errors.length === 0;
	}

	public defaultMessage(args: ValidationArguments): string {
		const object = args.object as ChallengeMetadataValidationObject;

		const errors = object[METADATA_ERROR_KEY];

		if (errors && errors.length > 0) {
			return `Metadata validation failed for type ${object.type}: ${errors.join('; ')}`;
		}

		return `Metadata validation failed for type ${object.type}`;
	}
}

export function IsChallengeMetadata(validationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: IsChallengeMetadataConstraint,
		});
	};
}
