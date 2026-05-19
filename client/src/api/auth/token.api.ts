import { apiClient } from '../axios';

export const validateVerificationToken = async (token: string) =>
	(await apiClient.post(`/v1/auth/email-confirmation`, { token })).data;
