import { SettingsFormFields } from '@/types';
import { DefaultValues, FieldValues } from 'react-hook-form';
import { ZodObject } from 'zod';

export interface SettingsFormProps<
	T extends FieldValues,
	R extends { id: string }
> {
	fields: SettingsFormFields<T>[];
	mutationFn: (data: T) => Promise<R>;
	onSuccess?: (data: R) => void;
	schema?: ZodObject<T>;
	buttonLabel?: string;
	defaultValues?: Partial<T> | DefaultValues<T>;
}
