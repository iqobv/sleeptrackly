import { sendVerificationEmail } from '@/api';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useEmailConfirm = () => {
	const { mutate } = useMutation({
		mutationFn: sendVerificationEmail,
		mutationKey: ['send-verification-email'],
		onSuccess() {
			toast.success('Verification email sent');
		},
		onError(error) {
			toast.error(error.message);
		},
	});

	return {
		sendConfirmation: mutate,
	};
};
