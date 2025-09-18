/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { Button, TextField } from '@/components/UI';
import { useAuth } from '@/hooks';
import { IUser } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { DefaultValues, FieldValues, Path, useForm } from 'react-hook-form';
import { MdErrorOutline } from 'react-icons/md';
import { ZodType } from 'zod';
import { AuthField } from '../../../types/authField.types';
import styles from './AuthForm.module.scss';

interface AuthFormProps<T extends FieldValues, R> {
	fields: AuthField<T>[];
	mutationFn: (data: T) => Promise<R>;
	onSuccess?: (data: R) => void;
	schema?: ZodType<T, any, any>;
	buttonLabel?: string;
	bottomText?: React.ReactNode;
	defaultValues?: DefaultValues<T>;
}

const AuthForm = <T extends FieldValues, R>({
	fields,
	mutationFn,
	buttonLabel,
	onSuccess,
	schema,
	bottomText,
	defaultValues,
}: AuthFormProps<T, R>) => {
	const { setUser } = useAuth();
	const router = useRouter();

	const resolver = !!schema ? zodResolver(schema) : undefined;

	const {
		register,
		handleSubmit,
		reset,
		setError,
		resetField,
		formState: { errors },
	} = useForm<T>({
		resolver,
		defaultValues,
	});

	const { mutate } = useMutation({
		mutationFn,
		onSuccess(data) {
			reset();
			onSuccess?.(data);
			setUser(data as IUser);
			router.refresh();
		},
		onError(error) {
			setError('root', { message: error.message });
			resetField('password' as Path<T>);
		},
	});

	const onSubmit = (data: T) => mutate(data);

	return (
		<form className={styles['auth-form']} onSubmit={handleSubmit(onSubmit)}>
			{errors['root'] && (
				<div className={styles['auth-form__error']}>
					<MdErrorOutline />
					<p>{errors['root']?.message as string}</p>
				</div>
			)}
			{fields.map((f) => (
				<div key={f.name}>
					<TextField
						placeholder={f.placeholder}
						autoComplete={f.autocomplete}
						type={f.type}
						fullWidth
						label={f.label}
						error={errors[f.name]?.message as string}
						leftIcon={f.icon}
						{...(f.type?.includes('password') && {
							rightIconClassName: styles['auth-form__password-icon'],
						})}
						{...register(f.name)}
					/>
				</div>
			))}
			<Button fullWidth type="submit" className={styles['auth-form__button']}>
				{buttonLabel}
			</Button>
			{!!bottomText && (
				<div className={styles['auth-form__bottom-text']}>{bottomText}</div>
			)}
		</form>
	);
};

export default AuthForm;
