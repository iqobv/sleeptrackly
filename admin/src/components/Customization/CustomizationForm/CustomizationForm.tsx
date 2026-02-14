'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import {
	DefaultValues,
	FieldValues,
	FormProvider,
	useForm,
} from 'react-hook-form';
import { ZodType } from 'zod';

interface CustomizationFormProps<T extends FieldValues, R> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	schema: ZodType<T, any, any>;
	mutationFn: (data: T) => Promise<R>;
	onSuccess?: (data: R) => void;
	onSubmit?: (data: T) => void;
	defaultValues?: DefaultValues<T>;
	id?: string;
	children: React.ReactNode;
}

const CustomizationForm = <T extends FieldValues, R>({
	schema,
	mutationFn,
	onSuccess,
	onSubmit,
	defaultValues,
	id,
	children,
}: CustomizationFormProps<T, R>) => {
	const isEditMode = !!id;

	const methods = useForm<T>({
		resolver: zodResolver(schema),
		defaultValues,
	});

	const { mutate } = useMutation({
		mutationFn: (data: T) => mutationFn(data),
		onSuccess: (data) => {
			onSuccess?.(data);
		},
	});

	const { reset, handleSubmit } = methods;

	const handleReset = useCallback(() => {
		if (isEditMode && defaultValues) {
			reset(defaultValues, { keepDirty: false });
		}
	}, [defaultValues, reset, isEditMode]);

	useEffect(() => {
		handleReset();
	}, [handleReset]);

	const formOnSubmit = (data: T) => {
		mutate(data);
		onSubmit?.(data);
	};

	return (
		<FormProvider<T> {...methods}>
			<form onSubmit={handleSubmit(formOnSubmit)}>{children}</form>
		</FormProvider>
	);
};

export default CustomizationForm;
