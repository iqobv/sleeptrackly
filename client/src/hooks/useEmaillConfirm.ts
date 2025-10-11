import { sendVerificationEmail } from '@/api';
import { QUERY_KEYS } from '@/config';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useEmailConfirm = () => {
	const { mutate } = useMutation({
		mutationFn: sendVerificationEmail,
		mutationKey: QUERY_KEYS.auth.sendVerificationEmail,
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
