'use client';

import { Button, TextField } from '@/components/UI';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import SettingsField from '../SettingsField/SettingsField';
import styles from './SettingsForm.module.scss';
import { SettingsFormProps } from './SettingsForm.types';

const SettingsForm = <T extends FieldValues, R>({
	fields,
	schema,
	defaultValues,
	onSuccess,
	mutationFn,
}: SettingsFormProps<T, R>) => {
	const router = useRouter();

	const resolver = !!schema ? zodResolver(schema) : undefined;

	const methods = useForm<T>({
		resolver,
		defaultValues,
	});

	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { errors, isDirty, dirtyFields },
	} = methods;

	const { mutate, isPending } = useMutation({
		mutationFn,
		onSuccess(data) {
			reset();
			toast.success('Settings updated');
			router.refresh();
			onSuccess?.(data);
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	useEffect(() => {
		reset(defaultValues);
	}, [defaultValues, reset]);

	const onSubmit: SubmitHandler<T> = () => {
		const changedFields: Partial<T> = {};
		const currentValues = getValues();

		Object.keys(dirtyFields).forEach((key) => {
			if ((dirtyFields as Record<string, boolean>)[key]) {
				changedFields[key as keyof T] = currentValues[key as keyof T];
			}
		});

		mutate(changedFields as T);
	};

	return (
		<div className={styles['settings-form']}>
			<form
				className={styles['settings-form__form']}
				onSubmit={handleSubmit(onSubmit)}
			>
				{fields.map((f) => (
					<SettingsField
						key={f.name}
						label={f.label}
						mobileDirection={f.mobileDirection}
					>
						{!!f.render ? (
							f.render({
								...f,
								methods,
								error: errors[f.name]?.message as string | undefined,
							})
						) : (
							<TextField
								type={f.type}
								placeholder={f.placeholder}
								error={errors[f.name]?.message as string | undefined}
								autoComplete={f.autocomplete}
								{...register(f.name)}
							/>
						)}
					</SettingsField>
				))}
				{isDirty && (
					<Button
						type="submit"
						fullWidth
						loading={isPending}
						className={styles['settings-form__save']}
					>
						Save
					</Button>
				)}
			</form>
		</div>
	);
};

export default SettingsForm;
