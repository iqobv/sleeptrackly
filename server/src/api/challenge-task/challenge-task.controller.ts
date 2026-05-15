import { Authorized } from '@libs/decorators';
import { Body, Controller, Param, Patch } from '@nestjs/common';
import {
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { ChallengeTaskService } from './challenge-task.service';
import {
	ChallengeTaskDto,
	UpdateChallengeTaskDto,
	UpdateChallengeTaskParamsDto,
} from './dto';

@ApiTags('Challenge Task')
@Controller('challenge-tasks')
export class ChallengeTaskController {
	constructor(private readonly challengeTaskService: ChallengeTaskService) {}

	@ApiOperation({ summary: 'Update challenge task' })
	@ApiOkResponse({ type: ChallengeTaskDto })
	@ApiNotFoundResponse({
		description: 'Challenge not found<br/>Task not found',
	})
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
