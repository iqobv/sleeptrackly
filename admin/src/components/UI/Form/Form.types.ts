import { BaseSyntheticEvent } from 'react';
import { DefaultValues, FieldValues, UseFormReturn } from 'react-hook-form';
import { ZodType } from 'zod';

export interface FormProps<D extends FieldValues> {
	children: React.ReactNode | ((methods: UseFormReturn<D>) => React.ReactNode);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	schema: ZodType<D, any, any>;
	onSubmit?: (
		data: D,
		event: BaseSyntheticEvent | undefined,
		methods: UseFormReturn<D>,
	) => void | Promise<void>;
	defaultValues?: DefaultValues<D>;
	values?: D;
	className?: string;
}
