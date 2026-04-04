import { fetcher } from '@/utils';

export const sendEmailForResetPassword = async (email: string) =>
	await fetcher(
		`/v1/auth/password-recovery/email`,
		{
			method: 'POST',
			body: JSON.stringify({ email }),
		},
		false,
	);

export const resetPassword = async (token: string, password: string) =>
	await fetcher(
		`/v1/auth/password-recovery/reset`,
		{
			method: 'POST',
			body: JSON.stringify({ token, password }),
		},
		false,
	);

export const needOldPassword = async () =>
	await fetcher<boolean>('/v1/auth/password-recovery/need-old-password');

export const changePassword = async ({
	oldPassword,
	newPassword,
}: {
	oldPassword?: string | null | undefined;
	newPassword: string;
}) =>
	await fetcher(
		`/v1/auth/password-recovery/change`,
		{
			method: 'POST',
			body: JSON.stringify({ oldPassword, newPassword }),
		},
		false,
	);
