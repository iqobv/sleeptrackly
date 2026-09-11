import { UpdateAchievementDto } from '@/dto/achievement/achievement.dto';
import { getFormData } from '@/utils/getFormData.util';
import { paths } from '@shared/types';
import { apiClient } from '../axios';

type UpdateAchievementResponse =
	paths['/v1/achievements/{id}']['patch']['responses']['200']['content']['application/json'];

export const updateAchievement = async (
	id: string,
	dto: UpdateAchievementDto,
) => {
	const formData = getFormData(dto);

	return (
		await apiClient.patch<UpdateAchievementResponse>(
			`/v1/achievements/${id}`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		)
	).data;
};
