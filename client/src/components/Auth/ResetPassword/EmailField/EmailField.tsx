'use client';

import { sendEmailForResetPassword } from '@/api';
import { Button, TextField } from '@/components/UI';
import { QUERY_KEYS } from '@/config';
import { EmailDto } from '@/dto';
import { emailSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import ResetForm from '../ResetForm/ResetForm';
import styles from './EmailField.module.scss';

const EmailField = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<EmailDto>({
		resolver: zodResolver(emailSchema),
		defaultValues: {
			email: '',
		},
	});

	const { mutate, isSuccess, isPending } = useMutation({
		mutationFn: ({ email }: EmailDto) => sendEmailForResetPassword(email),
		mutationKey: QUERY_KEYS.auth.sendEmailForResetPassword,
	});

	const onSubmit = (data: EmailDto) => mutate(data);

	return (
		<div className={styles['email-field']}>
			{isSuccess && (
				<div className={styles['email-field__success']}>
					<p>
						Reset link was sent to your email. Please check your inbox. If you
						didn&apos;t receive an email, please check your spam folder.
					</p>
					<Button variant="outlined" href="https://gmail.com" target="_blank">
						<FcGoogle />
						Gmail
					</Button>
				</div>
			)}
			<ResetForm
				buttonText="Send reset link"
				onSubmit={handleSubmit(onSubmit)}
				isPending={isPending}
			>
				<TextField
					label="Enter your email"
					placeholder="email@gmail.com"
					error={errors.email?.message}
					{...register('email')}
				/>
			</ResetForm>
		</div>
	);
};

export default EmailField;
