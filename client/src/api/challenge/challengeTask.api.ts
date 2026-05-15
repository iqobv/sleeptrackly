import { ChallengeTaskDto } from '@/dto';
import { ChallengeTask } from '@/types';
import { apiClient } from '../axios';

export const updateTask = async (
	challengeId: string,
	taskId: string,
	data: ChallengeTaskDto,
) =>
	(
		await apiClient.patch<ChallengeTask>(
			`/v1/challenge-tasks/challenge/${challengeId}/task/${taskId}`,
			data,
		)
	).data;
