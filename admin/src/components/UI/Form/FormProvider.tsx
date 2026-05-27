'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { BaseSyntheticEvent } from 'react';
import {
	FieldValues,
	FormProvider as RHFFormProvider,
	useForm,
} from 'react-hook-form';
import { FormProps } from './Form.types';

export const Form = <TIn extends FieldValues, TOut = TIn>({
	children,
	schema,
	className,
	defaultValues,
	onSubmit,
	values,
}: FormProps<TIn, TOut>) => {
	const methods = useForm<TIn, unknown, TOut>({
		resolver: zodResolver(schema),
		defaultValues,
		values,
	});

	return (
		<RHFFormProvider {...methods}>
			<form
				className={className}
				onSubmit={
					onSubmit
						? methods.handleSubmit((data: TOut, event?: BaseSyntheticEvent) =>
								onSubmit(data, event, methods),
							)
						: undefined
				}
			>
				{typeof children === 'function' ? children(methods) : children}
			</form>
		</RHFFormProvider>
	);
};
