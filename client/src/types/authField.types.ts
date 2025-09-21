import { FieldValues } from 'react-hook-form';
import { Field } from './field.types';

export interface AuthField<T extends FieldValues> extends Field<T> {
	icon?: React.ReactNode;
}
