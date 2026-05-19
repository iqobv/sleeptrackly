/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { Button, Field, Input, Select, Textarea } from '@/components/UI';
import { ChallengeField, Option } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	Controller,
	DefaultValues,
	FieldValues,
	get,
	useForm,
} from 'react-hook-form';
import { ZodType } from 'zod';

import { QUERY_KEYS } from '@/config';
import { useAuth } from '@/hooks';
import { useEffect } from 'react';
import styles from './ChallengeForm.module.scss';

interface AuthFormProps<T extends FieldValues, R extends { id: string }> {
	fields: ChallengeField<T>[];
	mutationFn: (data: T) => Promise<R>;
	onSuccess?: (data: R) => void;
	schema?: ZodType<T, any, any>;
	buttonLabel?: string;
	defaultValues?: Partial<T> | DefaultValues<T>;
}

const ChallengeForm = <T extends FieldValues, R extends { id: string }>({
	fields,
	mutationFn,
	buttonLabel = 'Submit',
	onSuccess,
	schema,
	defaultValues,
}: AuthFormProps<T, R>) => {
	const queryClient = useQueryClient();
	const { user } = useAuth();

	const resolver = !!schema ? zodResolver(schema) : undefined;

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setError,
		control,
	} = useForm({
		resolver,
		defaultValues,
	});

	useEffect(() => {
		if (defaultValues) reset(defaultValues);
	}, [defaultValues, reset]);

	const { mutate } = useMutation({
		mutationFn,
		gcTime: 0,
		onSuccess(data) {
			reset();
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.challenges.all(user?.id || ''),
			});
			onSuccess?.(data);
		},
		onError(error) {
			setError('root', { message: error.message });
		},
	});

	const onSubmit = (data: T) => {
		mutate(data);
	};

	const errorMessage = (f: ChallengeField<T>) =>
		get(errors, f.name)?.message as string;

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			{errors.root && <p>{errors.root.message}</p>}
			{fields.map(({ componentType, ...f }) => (
				<Field
					key={f.name}
					label={f.label}
					error={errorMessage(f)}
					required={f.required}
				>
					{componentType === 'input' && (
						<Input
							type={f.type}
							autoComplete={f.autoComplete}
							placeholder={f.placeholder}
							{...register(f.name)}
						/>
					)}
					{componentType === 'textarea' && (
						<Textarea
							autoComplete={f.autoComplete}
							placeholder={f.placeholder}
							minRows={1}
							maxRows={4}
							{...register(f.name)}
						/>
					)}
					{componentType === 'list' && !!f.options && (
						<Controller
							name={f.name}
							control={control}
							render={({ field }) => (
								<Select
									options={f.options as Option[]}
									placeholder={f.placeholder}
									isClearable
									{...field}
								/>
							)}
						/>
					)}
				</Field>
			))}
			<Button type="submit" className={styles.submit}>
				{buttonLabel}
			</Button>
		</form>
	);
};

export default ChallengeForm;
