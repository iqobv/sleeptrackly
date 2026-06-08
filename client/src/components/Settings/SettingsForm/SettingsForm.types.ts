/* eslint-disable @typescript-eslint/no-explicit-any */

import { SettingsFormFields } from '@/types';
import { DefaultValues, FieldValues } from 'react-hook-form';
import { ZodType } from 'zod';

export interface SettingsFormProps<T extends FieldValues, R> {
	fields: SettingsFormFields<T>[];
	mutationFn: (data: T) => Promise<R>;
	onSuccess?: (data: R) => void;
	schema?: ZodType<T, any, any>;
	defaultValues?: DefaultValues<T>;
	values?: T;
}
