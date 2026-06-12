import { apiClient } from '@/api/axios';
import { UpdateBundleDto } from '@/dto/customization/bundle.dto';
import { paths } from '@/types/schema';
import { getFormData } from '@/utils/getFormData.util';

type UpdateBundleResponse =
	paths['/v1/bundles/{id}']['patch']['responses']['200']['content']['application/json'];

export const updateBundle = async (id: string, dto: UpdateBundleDto) => {
	const formData = getFormData(dto);

	return (
		await apiClient.patch<UpdateBundleResponse>(`/v1/bundles/${id}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	).data;
};
