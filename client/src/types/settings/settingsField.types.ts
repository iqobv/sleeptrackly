import { FieldValues, UseFormReturn } from 'react-hook-form';
import { Field } from '../ui/field.types';

export type MobileDirection = 'row' | 'column';

export interface SettingsFormFields<T extends FieldValues> extends Field<T> {
	render?: (
		props: {
			methods: UseFormReturn<T>;
			error?: string;
		} & Field<T>,
	) => React.ReactNode;
	mobileDirection?: MobileDirection;
	accept?: string;
}
