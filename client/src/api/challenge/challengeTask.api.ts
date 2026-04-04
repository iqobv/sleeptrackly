import { ChallengeTaskDto } from '@/dto';
import { IChallengeTask } from '@/types';
import { fetcher } from '@/utils';

export const updateTask = async (
	challengeId: string,
	taskId: string,
	data: ChallengeTaskDto,
) =>
	await fetcher<IChallengeTask>(
		`/v1/challenge-tasks/challenge/${challengeId}/task/${taskId}`,
		{
			method: 'PATCH',
			body: JSON.stringify(data),
		},
	);
