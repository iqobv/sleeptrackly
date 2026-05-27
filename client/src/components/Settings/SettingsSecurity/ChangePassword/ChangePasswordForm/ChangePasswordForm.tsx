'use client';

import { changePassword, needOldPassword } from '@/api';
import { Button, Field, Input, Loader } from '@/components/UI';
import { QUERY_KEYS } from '@/config';
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
	handleClose: () => void;
}

export const ChangePasswordForm = ({
	handleClose,
}: ChangePasswordFormProps) => {
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
		queryKey: QUERY_KEYS.auth.needOldPassword(user?.id || ''),
		enabled: !!user?.id,
	});

	const { mutate } = useMutation({
		mutationFn: ({ oldPassword, newPassword }: ChangePasswordDto) =>
			changePassword({ oldPassword, newPassword }),
		mutationKey: QUERY_KEYS.auth.changePassword(user?.id || ''),
		onSuccess() {
			reset();
			toast.success('Password changed');
			router.refresh();
			handleClose();
		},
		onError(error) {
			toast.error(error.message);
		},
	});

	const onSubmit = (data: ChangePasswordDto) => mutate(data);

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			{isLoading && <Loader />}
			{isFetched && (
				<>
					{CHANGE_PASSWORD_FIELD.map((f) => {
						if (!data && f.name === 'oldPassword') return null;
						return (
							<Field
								key={f.name}
								error={errors[f.name]?.message}
								label={f.label}
							>
								<Input
									placeholder={f.placeholder}
									type={f.type}
									autoComplete={f.autoComplete}
									{...register(f.name)}
								/>
							</Field>
						);
					})}
				</>
			)}
			<Button type="submit" className={styles.button}>
				Change password
			</Button>
		</form>
	);
};
