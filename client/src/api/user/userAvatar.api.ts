import { paths } from '@shared/types';
import { apiClient } from '../axios';

type UploadUserAvatarResponse =
	paths['/v1/user-avatar/upload']['post']['responses']['200']['content']['application/json'];

export const uploadUserAvatar = async (file: File) => {
	const formData = new FormData();
	formData.append('avatar', file);
	return (
		await apiClient.post<UploadUserAvatarResponse>(
			'/v1/user-avatar/upload',
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		)
	).data;
};
