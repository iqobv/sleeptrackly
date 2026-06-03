import { ChallengeTaskDto } from '@/dto';
import { paths } from '@/types/schema';
import { apiClient } from '../axios';

type UpdateChallengeTaskResponse =
	paths['/v1/challenge-tasks/challenge/{challengeId}/task/{taskId}']['patch']['responses']['200']['content']['application/json'];

export const updateTask = async (
	challengeId: string,
	taskId: string,
	data: ChallengeTaskDto,
) =>
	(
		await apiClient.patch<UpdateChallengeTaskResponse>(
			`/v1/challenge-tasks/challenge/${challengeId}/task/${taskId}`,
			data,
		)
	).data;
