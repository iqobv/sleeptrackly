import { apiClient } from '../axios';

export const sendEmailForResetPassword = async (email: string) =>
	(await apiClient.post(`/v1/auth/password-recovery/email`, { email })).data;

export const resetPassword = async (token: string, password: string) =>
	(
		await apiClient.post(`/v1/auth/password-recovery/reset`, {
			token,
			password,
		})
	).data;

export const needOldPassword = async () =>
	(await apiClient<boolean>('/v1/auth/password-recovery/need-old-password'))
		.data;

export const changePassword = async ({
	oldPassword,
	newPassword,
}: {
	oldPassword?: string | null | undefined;
	newPassword: string;
}) =>
	(
		await apiClient.post(`/v1/auth/password-recovery/change`, {
			oldPassword,
			newPassword,
		})
	).data;
