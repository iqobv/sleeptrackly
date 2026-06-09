import { BaseSyntheticEvent, ReactNode } from 'react';
import { DefaultValues, FieldValues, UseFormReturn } from 'react-hook-form';
import { ZodType } from 'zod';

export interface FormProps<TIn extends FieldValues, TOut = TIn> {
	children:
		| ReactNode
		| ((methods: UseFormReturn<TIn, unknown, TOut>) => ReactNode);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	schema: ZodType<TOut, any, any>;
	onSubmit?: (
		data: TOut,
		event: BaseSyntheticEvent | undefined,
		methods: UseFormReturn<TIn, unknown, TOut>,
	) => void | Promise<void>;
	defaultValues?: DefaultValues<TIn>;
	values?: TIn;
	className?: string;
}
