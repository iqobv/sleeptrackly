import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type SendEmailForResetPasswordResponse =
	paths['/v1/auth/email-confirmation/resend']['post']['responses']['200']['content']['application/json'];
type ResetPasswordResponse =
	paths['/v1/auth/password-recovery/reset']['post']['responses']['200']['content']['application/json'];
type NeedOldPasswordResponse =
	paths['/v1/auth/password-recovery/need-old-password']['get']['responses']['200']['content']['application/json'];
type ChangePasswordResponse =
	paths['/v1/auth/password-recovery/change']['post']['responses']['200']['content']['application/json'];

export const sendEmailForResetPassword = async (email: string) =>
	(
		await apiClient.post<SendEmailForResetPasswordResponse>(
			`/v1/auth/password-recovery/email`,
			{ email },
		)
	).data;

export const resetPassword = async (token: string, password: string) =>
	(
		await apiClient.post<ResetPasswordResponse>(
			`/v1/auth/password-recovery/reset`,
			{
				token,
				password,
			},
		)
	).data;

export const needOldPassword = async () =>
	(
		await apiClient<NeedOldPasswordResponse>(
			'/v1/auth/password-recovery/need-old-password',
		)
	).data;

export const changePassword = async ({
	oldPassword,
	newPassword,
}: {
	oldPassword?: string | null | undefined;
	newPassword: string;
}) =>
	(
		await apiClient.post<ChangePasswordResponse>(
			`/v1/auth/password-recovery/change`,
			{
				oldPassword,
				newPassword,
			},
		)
	).data;
