import { fetcher } from '@/utils';

export const validateVerificationToken = async (token: string) =>
	await fetcher(
		`api/v1/auth/email-confirmation`,
		{
			method: 'POST',
			body: JSON.stringify({ token }),
		},
		false,
	);
