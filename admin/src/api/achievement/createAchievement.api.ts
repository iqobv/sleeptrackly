import { CreateAchievementDto } from '@/dto/achievement/achievement.dto';
import { getFormData } from '@/utils/getFormData.util';
import { paths } from '@shared/types';
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
