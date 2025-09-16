'use client';

import { Button, Select, TextField } from '@/components/UI';
import { ChallengeField, IOption } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import {
	Controller,
	DefaultValues,
	FieldValues,
	get,
	useForm,
} from 'react-hook-form';
import { ZodType } from 'zod';

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
	}, [defaultValues]);

	const { mutate } = useMutation({
		mutationFn,
		onSuccess(data) {
			reset();
			onSuccess?.(data);
		},
		onError(error, variables, context) {
			setError('root', { message: error.message });
		},
	});

	const onSubmit = (data: T) => {
		mutate(data);
	};

	const errorMessage = (f: ChallengeField<T>) =>
		get(errors, f.name)?.message as string;

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={styles['challenge-form']}
		>
			{errors.root && <p>{errors.root.message}</p>}
			{fields.map(({ componentType, ...f }) => (
				<div key={f.name}>
					{componentType === 'input' && (
						<TextField {...f} error={errorMessage(f)} {...register(f.name)} />
					)}
					{componentType === 'textarea' && (
						<TextField
							{...f}
							multiline
							error={errorMessage(f)}
							{...register(f.name)}
						/>
					)}
					{componentType === 'list' && !!f.options && (
						<Controller
							name={f.name}
							control={control}
							render={({ field }) => (
								<Select
									options={f.options as IOption[]}
									{...f}
									isClearable
									isSearchable
									fullWidth
									error={get(errors, f.name)?.message as string}
									{...field}
									onChange={(option) =>
										field.onChange(option ? option.value.toUpperCase() : '')
									}
								/>
							)}
						/>
					)}
				</div>
			))}
			<Button type="submit" className={styles['submit-button']}>{buttonLabel}</Button>
		</form>
	);
};

export default ChallengeForm;
