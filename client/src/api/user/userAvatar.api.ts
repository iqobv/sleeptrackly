import { fetcher } from '@/utils';

export const uploadUserAvatar = async (file: File) => {
	const formData = new FormData();
	formData.append('avatar', file);
	return await fetcher('/v1/user-avatar/upload', {
		method: 'POST',
		body: formData,
	});
};
