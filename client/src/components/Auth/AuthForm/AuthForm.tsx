'use client';

import { registerWithPassword } from '@/api/auth/auth.api';
import { AUTH_PAGES } from '@/config/authPages.config';
import { LOCAL_STORAGE_KEYS } from '@/constants/localStorageKeys.constants';
import { useAuth } from '@/hooks/useAuth.hook';
import { AuthField } from '@/types/auth/authField.types';
import { User } from '@/types/user/user.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Field, Input } from '@shared/ui';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { DefaultValues, FieldValues, Path, useForm } from 'react-hook-form';
import { MdErrorOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import { ZodType } from 'zod';
import styles from './AuthForm.module.scss';
import { AuthFormRestore } from './AuthFormRestore';
import { CheckboxField } from './CheckboxField';

type RegisterApiResponse = Awaited<ReturnType<typeof registerWithPassword>>;

interface AuthFormProps<T extends FieldValues, R> {
	fields: AuthField<T>[];
	mutationFn: (data: T) => Promise<R>;
	onSuccess?: (data: R) => void;
	schema?: ZodType<T, any, any>;
	buttonLabel?: string;
	bottomText?: React.ReactNode;
	defaultValues?: DefaultValues<T>;
	isRegister?: boolean;
}

export const AuthForm = <T extends FieldValues, R>({
	fields,
	mutationFn,
	buttonLabel,
	onSuccess,
	schema,
	bottomText,
	defaultValues,
	isRegister = false,
}: AuthFormProps<T, R>) => {
	const [isDeletedError, setIsDeletedError] = useState(false);

	const { setUser } = useAuth();
	const router = useRouter();

	const resolver = schema ? zodResolver(schema) : undefined;

	const {
		register,
		handleSubmit,
		reset,
		setError,
		resetField,
		formState: { errors },
		watch,
	} = useForm<T>({
		resolver,
		defaultValues,
	});

	const { mutate, isPending } = useMutation({
		mutationFn,
		onSuccess: (data) => {
			if (isRegister) {
				toast.success((data as RegisterApiResponse).message);
				router.push(AUTH_PAGES.EMAIL_CONFIRMATION);
				const meta = (data as RegisterApiResponse)?.meta;
				if (meta?.email) {
					localStorage.setItem(
						LOCAL_STORAGE_KEYS.auth.registrationEmail,
						meta.email,
					);
				}
				onSuccess?.(data);
			} else {
				reset();
				onSuccess?.(data);
				setUser(data as User);
				router.refresh();
			}
		},
		onError: (error) => {
			if (error.message === 'Account is deleted. You can still restore it.') {
				setIsDeletedError(true);
			}
			setError('root', { message: error.message });
			resetField('password' as Path<T>);
		},
	});

	const onSubmit = (data: T) => mutate(data);

	const email = watch('email' as Path<T>);

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			{errors['root'] && (
				<div className={styles.error}>
					<div className={styles.errorContent}>
						<MdErrorOutline />
						<p>{errors['root']?.message as string}</p>
					</div>
					{isDeletedError && email && <AuthFormRestore email={email} />}
				</div>
			)}
			{fields.map(({ name, label, type, icon, ...f }) => (
				<React.Fragment key={name}>
					{type === 'checkbox' ? (
						<CheckboxField
							label={label}
							error={errors[name]?.message as string}
							{...register(name)}
						/>
					) : (
						<Field label={label}>
							<Input
								type={type}
								leftSection={icon}
								{...f}
								{...register(name)}
							/>
						</Field>
					)}
				</React.Fragment>
			))}
			<Button
				loading={isPending}
				fullWidth
				type="submit"
				className={styles.button}
			>
				{buttonLabel}
			</Button>
			<Link className={styles.link} href={AUTH_PAGES.RESET_PASSWORD}>
				Forgot password?
			</Link>
			{!!bottomText && <div className={styles.bottomText}>{bottomText}</div>}
		</form>
	);
};
