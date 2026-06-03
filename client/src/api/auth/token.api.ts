import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type ValidateVerificationTokenResponse =
	paths['/v1/auth/email-confirmation']['post']['responses']['200']['content']['application/json'];

export const validateVerificationToken = async (token: string) =>
	(
		await apiClient.post<ValidateVerificationTokenResponse>(
			`/v1/auth/email-confirmation`,
			{ token },
		)
	).data;
