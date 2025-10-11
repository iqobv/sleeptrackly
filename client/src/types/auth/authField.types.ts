import { FieldValues } from 'react-hook-form';
import { IField } from '../ui/field.types';

export interface AuthField<T extends FieldValues> extends IField<T> {
	icon?: React.ReactNode;
}
