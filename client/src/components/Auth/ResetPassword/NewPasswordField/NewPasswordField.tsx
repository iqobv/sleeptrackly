'use client';

import { resetPassword } from '@/api';
import { TextField } from '@/components/UI';
import { QUERY_KEYS } from '@/config';
import { PassordDto } from '@/dto';
import { passwordSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { MdOutlineVpnKey } from 'react-icons/md';
import { toast } from 'react-toastify';
import ResetForm from '../ResetForm/ResetForm';

interface NewPasswordFieldProps {
	token: string;
}

const NewPasswordField = ({ token }: NewPasswordFieldProps) => {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<PassordDto>({
		resolver: zodResolver(passwordSchema),
		defaultValues: { password: '' },
	});

	const { mutate, isPending } = useMutation({
		mutationFn: ({ password }: PassordDto) => resetPassword(token, password),
		mutationKey: QUERY_KEYS.auth.resetPassword,
		onSuccess() {
			router.refresh();
		},
		onError: (error) => {
			toast.error(error.message || 'An error occurred');
		},
	});

	const onSubmit = (data: PassordDto) => mutate(data);

	return (
		<ResetForm
			buttonText="Reset password"
			onSubmit={handleSubmit(onSubmit)}
			isPending={isPending}
		>
			<TextField
				placeholder="password"
				autoComplete="new-password"
				type="password"
				fullWidth
				label="Create a password"
				error={errors.password?.message}
				leftIcon={<MdOutlineVpnKey />}
				{...register('password')}
			/>
		</ResetForm>
	);
};

export default NewPasswordField;
