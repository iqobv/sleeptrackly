import { Body, Controller, Param, Patch } from '@nestjs/common';
import { Authorized } from 'src/libs/decorators';
import { ChallengeTaskService } from './challenge-task.service';
import { UpdateChallengeTaskDto, UpdateChallengeTaskParamsDto } from './dto';

@Controller('challenge-tasks')
export class ChallengeTaskController {
	constructor(private readonly challengeTaskService: ChallengeTaskService) {}

	@Patch('challenge/:challengeId/task/:taskId')
	async update(
		@Authorized('id') userId: string,
		@Param() params: UpdateChallengeTaskParamsDto,
		@Body() dto: UpdateChallengeTaskDto,
	) {
		const { challengeId, taskId } = params;

		return await this.challengeTaskService.update(
			challengeId,
			taskId,
			userId,
			dto,
		);
	}
}
