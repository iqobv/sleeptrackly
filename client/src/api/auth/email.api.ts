import { apiClient } from '../axios';

export const resendVerificationEmail = async (email: string) =>
	(await apiClient.post(`/v1/auth/email-confirmation/resend`, { email })).data;
