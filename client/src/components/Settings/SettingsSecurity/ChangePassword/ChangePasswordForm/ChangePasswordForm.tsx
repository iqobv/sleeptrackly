'use client';

import { changePassword, needOldPassword } from '@/api';
import { Button, Loader, TextField } from '@/components/UI';
import { ChangePasswordDto } from '@/dto';
import { useAuth } from '@/hooks';
import { changePasswordSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styles from './ChangePasswordForm.module.scss';
import { CHANGE_PASSWORD_FIELD } from './changePasswordFields';

interface ChangePasswordFormProps {
	handleCLose: () => void;
}

const ChangePasswordForm = ({ handleCLose }: ChangePasswordFormProps) => {
	const { user } = useAuth();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(changePasswordSchema),
		defaultValues: {
			oldPassword: '',
			newPassword: '',
		},
	});

	const { data, isFetched, isLoading } = useQuery<boolean>({
		queryFn: needOldPassword,
		queryKey: ['need-old-password', user?.id],
		enabled: !!user?.id,
	});

	const { mutate } = useMutation({
		mutationFn: ({ oldPassword, newPassword }: ChangePasswordDto) =>
			changePassword({ oldPassword, newPassword }),
		mutationKey: ['change-password'],
		onSuccess() {
			reset();
			toast.success('Password changed');
			router.refresh();
			handleCLose();
		},
		onError(error) {
			toast.error(error.message);
		},
	});

	const onSubmit = (data: ChangePasswordDto) => mutate(data);

	return (
		<form
			className={styles['change-password-form']}
			onSubmit={handleSubmit(onSubmit)}
		>
			{isLoading && <Loader />}
			{isFetched && (
				<>
					{CHANGE_PASSWORD_FIELD.map((f) => {
						if (!data && f.name === 'oldPassword') return null;
						return (
							<TextField
								key={f.name}
								placeholder={f.placeholder}
								type={f.type}
								label={f.label}
								autoComplete={f.autocomplete}
								error={errors[f.name]?.message as string}
								{...register(f.name)}
							/>
						);
					})}
				</>
			)}
			<Button type="submit">Change password</Button>
		</form>
	);
};

export default ChangePasswordForm;
