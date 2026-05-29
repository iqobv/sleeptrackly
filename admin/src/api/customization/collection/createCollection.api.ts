import { apiClient } from '@/api/axios';
import { CreateCollectionDto } from '@/dto';
import { BaseCollection } from '@/types';
import { getFormData } from '@/utils';

export const createCollection = async (dto: CreateCollectionDto) => {
	const formData = getFormData(dto);

	return (
		await apiClient.post<BaseCollection>('/v1/collections', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	).data;
};
