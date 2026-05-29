import { apiClient } from '@/api/axios';
import { UpdateCollectionDto } from '@/dto';
import { FullCollection } from '@/types';
import { getFormData } from '@/utils';

export const updateCollection = async (
	id: string,
	dto: UpdateCollectionDto,
) => {
	const formData = getFormData(dto);

	return (
		await apiClient.patch<FullCollection>(`/v1/collections/${id}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	).data;
};
