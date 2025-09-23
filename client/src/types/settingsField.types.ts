import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { Field } from './field.types';

export interface SettingsFormFields<T extends FieldValues> extends Field<T> {
	render?: (
		props: {
			register: UseFormRegister<T>;
			setValue: UseFormSetValue<T>;
			error?: string;
		} & Field<T>,
	) => React.ReactNode;
	accept?: string;
}
