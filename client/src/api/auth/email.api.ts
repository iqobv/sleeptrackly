import { fetcher } from '@/utils';

export const resendVerificationEmail = async (email: string) =>
	await fetcher(`/api/v1/auth/email-confirmation/resend`, {
		method: 'POST',
		body: JSON.stringify({ email }),
	});
