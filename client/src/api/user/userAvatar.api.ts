import { apiClient } from '../axios';

export const uploadUserAvatar = async (file: File) => {
	const formData = new FormData();
	formData.append('avatar', file);
	return (await apiClient.post('/v1/user-avatar/upload', formData)).data;
};
