import { paths } from '@/types/schema';
import { apiClient } from '../axios';

export type ResendVerificationEmailResponse =
	paths['/v1/auth/email-confirmation/resend']['post']['responses']['200']['content']['application/json'];

export const resendVerificationEmail = async (email: string) =>
	(
		await apiClient.post<ResendVerificationEmailResponse>(
			`/v1/auth/email-confirmation/resend`,
			{ email },
		)
	).data;
