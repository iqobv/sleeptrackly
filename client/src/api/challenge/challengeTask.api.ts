import { ChallengeTaskDto } from '@/dto';
import { IChallengeTask } from '@/types';
import { apiClient } from '../axios';

export const updateTask = async (
	challengeId: string,
	taskId: string,
	data: ChallengeTaskDto,
) =>
	(
		await apiClient.patch<IChallengeTask>(
			`/v1/challenge-tasks/challenge/${challengeId}/task/${taskId}`,
			data,
		)
	).data;
