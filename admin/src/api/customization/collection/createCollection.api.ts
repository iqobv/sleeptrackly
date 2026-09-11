import { apiClient } from '@/api/axios';
import { CreateCollectionDto } from '@/dto/customization/collection.dto';
import { getFormData } from '@/utils/getFormData.util';
import { paths } from '@shared/types';

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
