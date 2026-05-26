'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { BaseSyntheticEvent } from 'react';
import {
	FieldValues,
	FormProvider as RHFFormProvider,
	useForm,
} from 'react-hook-form';
import { FormProps } from './Form.types';

export const Form = <D extends FieldValues>({
	children,
	schema,
	className,
	defaultValues,
	onSubmit,
	values,
}: FormProps<D>) => {
	const methods = useForm<D>({
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
						? methods.handleSubmit((data: D, event?: BaseSyntheticEvent) =>
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
