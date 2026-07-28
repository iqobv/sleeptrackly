import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
} from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import { Controller, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChallengeTaskService } from './challenge-task.service';

@ApiTags('Challenge Task')
@Auth()
@Controller('challenge-tasks')
export class ChallengeTaskController {
	constructor(private readonly challengeTaskService: ChallengeTaskService) {}

	/** Recover a failed challenge task for the current user */
	@Post(':id/recover')
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.CHALLENGE_TASK.RECOVERED)
	@ApiErrorResponse(
		HttpStatus.NOT_FOUND,
		ERROR_MESSAGES.CHALLENGE_TASK.NOT_FOUND,
	)
	@ApiErrorResponse(HttpStatus.BAD_REQUEST, [
		ERROR_MESSAGES.CHALLENGE_TASK.ONLY_FAILED_TASKS_CAN_BE_RECOVERED,
		ERROR_MESSAGES.CHALLENGE_TASK.RECOVERY_NOT_AVAILABLE,
		ERROR_MESSAGES.CHALLENGE_TASK.RECOVERY_LIMIT_REACHED,
		ERROR_MESSAGES.CHALLENGE_TASK.NOT_ENOUGH_RECOVERIES_LEFT,
	])
	@HttpCode(HttpStatus.OK)
	public async recoverChallengeTask(
		@Param('id') taskId: string,
		@Authorized('id') userId: string,
	): Promise<MessageResponse> {
		await this.challengeTaskService.recoverChallengeTask(userId, taskId);

		return SUCCESS_MESSAGES.CHALLENGE_TASK.RECOVERED;
	}
}
