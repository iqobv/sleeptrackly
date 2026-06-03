import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type SendRestoreEmailResponse =
	paths['/v1/auth/restore-account/send-email']['post']['responses']['200']['content']['application/json'];

export const sendRestoreEmail = async (email: string) =>
	(
		await apiClient.post<SendRestoreEmailResponse>(
			'/v1/auth/restore-account/send-email',
			{ email },
		)
	).data;
