import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
} from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import { Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StreakService } from './streak.service';

@Auth()
@ApiTags('Streaks')
@Controller('streaks')
export class StreakController {
	constructor(private readonly streakService: StreakService) {}

	/** Restore a sleep streak */
	@Post('restore')
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.STREAK.STREAK_RESTORED)
	@ApiErrorResponse(HttpStatus.BAD_REQUEST, [
		ERROR_MESSAGES.STREAK.NO_ACTIVE_STREAK,
		ERROR_MESSAGES.STREAK.NOT_ENOUGH_RESTORES,
		ERROR_MESSAGES.STREAK.ALREADY_ENDED,
		ERROR_MESSAGES.STREAK.ALREADY_ACTIVE,
	])
	public async restoreStreak(
		@Authorized('id') userId: string,
	): Promise<MessageResponse> {
		return await this.streakService.restoreStreak(userId);
	}
}
