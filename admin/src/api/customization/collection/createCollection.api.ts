import { apiClient } from '@/api/axios';
import { CreateCollectionDto } from '@/dto/customization/collection.dto';
import { paths } from '@/types/schema';
import { getFormData } from '@/utils/getFormData.util';

type CreateCollectionResponse =
	paths['/v1/collections']['post']['responses']['201']['content']['application/json'];

export const createCollection = async (dto: CreateCollectionDto) => {
	const formData = getFormData(dto);

	return (
		await apiClient.post<CreateCollectionResponse>(
			'/v1/collections',
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		)
	).data;
};
