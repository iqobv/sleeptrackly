import { CreateAchievementDto } from '@/dto';
import { FullAchievement } from '@/types';
import { getFormData } from '@/utils';
import { apiClient } from '../axios';

export const createAchievement = async (dto: CreateAchievementDto) => {
	const formData = getFormData(dto);

	return (
		await apiClient.post<FullAchievement>('/v1/achievements', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	).data;
};
