import { CreateAchievementDto } from '@/dto';
import { paths } from '@/types/schema';
import { getFormData } from '@/utils';
import { apiClient } from '../axios';

type CreateAchievementResponse =
	paths['/v1/achievements']['post']['responses']['201']['content']['application/json'];

export const createAchievement = async (dto: CreateAchievementDto) => {
	const formData = getFormData(dto);

	return (
		await apiClient.post<CreateAchievementResponse>(
			'/v1/achievements',
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		)
	).data;
};
