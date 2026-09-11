import { apiClient } from '@/api/axios';
import { CreateBundleDto } from '@/dto/customization/bundle.dto';
import { getFormData } from '@/utils/getFormData.util';
import { paths } from '@shared/types';

type CreateBundleResponse =
	paths['/v1/bundles']['post']['responses']['201']['content']['application/json'];

export const createBundle = async (dto: CreateBundleDto) => {
	const formData = getFormData(dto);

	return (
		await apiClient.post<CreateBundleResponse>('/v1/bundles', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	).data;
};
