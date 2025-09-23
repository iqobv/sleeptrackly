import { fetcher } from '@/utils';

export const sendVerificationEmail = async () =>
	await fetcher(`/api/v1/auth/email-confirmation/resend`, {
		method: 'POST',
	});
