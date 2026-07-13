import { Auth } from '@libs/decorators/auth.decorator';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChallengeTaskService } from './challenge-task.service';

@ApiTags('Challenge Task')
@Auth()
@Controller('challenge-tasks')
export class ChallengeTaskController {
	constructor(private readonly challengeTaskService: ChallengeTaskService) {}

	// /** Update challenge task */
	// @ApiOkResponse({ type: ChallengeTaskDto })
	// @ApiErrorResponse(HttpStatus.NOT_FOUND, [
	// 	ERROR_MESSAGES.CHALLENGE.NOT_FOUND,
	// 	ERROR_MESSAGES.CHALLENGE_TASK.NOT_FOUND,
	// ])
	// @Patch('challenge/:challengeId/task/:taskId')
	// public async update(
	// 	@Authorized('id') userId: string,
	// 	@Param() params: UpdateChallengeTaskParamsDto,
	// 	@Body() dto: UpdateChallengeTaskDto,
	// ): Promise<ChallengeTaskDto> {
	// 	const { challengeId, taskId } = params;

	// 	return await this.challengeTaskService.update(
	// 		challengeId,
	// 		taskId,
	// 		userId,
	// 		dto,
	// 	);
	// }
}
