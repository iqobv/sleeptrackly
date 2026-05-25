import { UpdateAchievementDto } from '@/dto';
import { getFormData } from '@/utils';
import { apiClient } from '../axios';

export const updateAchievement = async (
	id: string,
	dto: UpdateAchievementDto,
) => {
	const formData = getFormData(dto);

	return (
		await apiClient.patch(`/v1/achievements/${id}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	).data;
};
