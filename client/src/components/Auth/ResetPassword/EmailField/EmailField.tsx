'use client';

import { sendEmailForResetPassword } from '@/api';
import { Button, Field, Input } from '@/components/UI';
import { QUERY_KEYS } from '@/config';
import { EmailDto } from '@/dto';
import { emailSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
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
		<div className={styles.field}>
			{isSuccess && (
				<div className={styles.success}>
					<p>
						Reset link was sent to your email. Please check your inbox. If you
						didn&apos;t receive an email, please check your spam folder.
					</p>
					<Button variant="outlined" asChild>
						<Link href="https://gmail.com" target="_blank">
							<FcGoogle />
							Gmail
						</Link>
					</Button>
				</div>
			)}
			<ResetForm
				buttonText="Send reset link"
				onSubmit={handleSubmit(onSubmit)}
				isPending={isPending}
			>
				<Field label="Enter your email" error={errors.email?.message} required>
					<Input placeholder="email@example.com" {...register('email')} />
				</Field>
			</ResetForm>
		</div>
	);
};

export default EmailField;
