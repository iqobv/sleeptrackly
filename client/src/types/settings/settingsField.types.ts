import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { IField } from '../ui/field.types';

export interface SettingsFormFields<T extends FieldValues> extends IField<T> {
	render?: (
		props: {
			register: UseFormRegister<T>;
			setValue: UseFormSetValue<T>;
			error?: string;
		} & IField<T>
	) => React.ReactNode;
	accept?: string;
}
