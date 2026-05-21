import { MessageApiResponse } from '@/types';
import { apiClient } from '../axios';

export const sendRestoreEmail = async (email: string) =>
	(
		await apiClient.post<MessageApiResponse>(
			'/v1/auth/restore-account/send-email',
			{ email },
		)
	).data;
