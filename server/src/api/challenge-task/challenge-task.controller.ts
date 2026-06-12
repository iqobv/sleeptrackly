import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { ApiErrorResponse } from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { Body, Controller, HttpStatus, Param, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ChallengeTaskService } from './challenge-task.service';
import { ChallengeTaskDto } from './dto/challenge-task.dto';
import { UpdateChallengeTaskParamsDto } from './dto/update-challenge-task-params.dto';
import { UpdateChallengeTaskDto } from './dto/update-challenge-task.dto';

@ApiTags('Challenge Task')
@Auth()
@Controller('challenge-tasks')
export class ChallengeTaskController {
	constructor(private readonly challengeTaskService: ChallengeTaskService) {}

	/** Update challenge task */
	@ApiOkResponse({ type: ChallengeTaskDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, [
		ERROR_MESSAGES.CHALLENGE.NOT_FOUND,
		ERROR_MESSAGES.CHALLENGE_TASK.NOT_FOUND,
	])
	@Patch('challenge/:challengeId/task/:taskId')
	public async update(
		@Authorized('id') userId: string,
		@Param() params: UpdateChallengeTaskParamsDto,
		@Body() dto: UpdateChallengeTaskDto,
	): Promise<ChallengeTaskDto> {
		const { challengeId, taskId } = params;

		return await this.challengeTaskService.update(
			challengeId,
			taskId,
			userId,
			dto,
		);
	}
}
