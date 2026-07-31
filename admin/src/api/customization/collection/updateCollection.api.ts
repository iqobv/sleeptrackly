import { apiClient } from '@/api/axios';
import { UpdateCollectionDto } from '@/dto/customization/collection.dto';
import { getFormData } from '@/utils/getFormData.util';
import { paths } from '@shared/types';

type UpdateCollectionResponse =
	paths['/v1/collections/{id}']['patch']['responses']['200']['content']['application/json'];

export const updateCollection = async (
	id: string,
	dto: UpdateCollectionDto,
) => {
	const formData = getFormData(dto);

	return (
		await apiClient.patch<UpdateCollectionResponse>(
			`/v1/collections/${id}`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		)
	).data;
};
