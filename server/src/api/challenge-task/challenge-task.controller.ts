import { ERROR_MESSAGES } from '@libs/constants';
import { ApiErrorResponse, Auth, Authorized } from '@libs/decorators';
import { Body, Controller, HttpStatus, Param, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChallengeTaskService } from './challenge-task.service';
import {
	ChallengeTaskDto,
	UpdateChallengeTaskDto,
	UpdateChallengeTaskParamsDto,
} from './dto';

@ApiTags('Challenge Task')
@Auth()
@Controller('challenge-tasks')
export class ChallengeTaskController {
	constructor(private readonly challengeTaskService: ChallengeTaskService) {}

	@ApiOperation({ summary: 'Update challenge task' })
	@ApiOkResponse({ type: ChallengeTaskDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, [
		ERROR_MESSAGES.CHALLENGE.NOT_FOUND,
		ERROR_MESSAGES.CHALLENGE_TASK.NOT_FOUND,
	])
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
