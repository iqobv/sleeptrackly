import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
} from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Patch,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserSleepStatusDto } from './dto/sleep-status.dto';
import { UpdateUserSleepStatusDto } from './dto/update-sleep-status.dto';
import { UpdatedSleepStatusDto } from './dto/updated-sleep-status.dto';
import { UserSleepStatusService } from './user-sleep-status.service';

@Auth()
@ApiTags('User Sleep Status')
@Controller('sleep')
export class UserSleepStatusController {
	constructor(
		private readonly userSleepStatusService: UserSleepStatusService,
	) {}

	/** Get current user sleep status */
	@Get()
	@ApiOkResponse({ type: UserSleepStatusDto })
	public async getSleepStatus(
		@Authorized('id') userId: string,
	): Promise<UserSleepStatusDto | null> {
		return await this.userSleepStatusService.getSleepStatus(userId);
	}

	/** Update user sleep status (start/stop sleep) */
	@Patch()
	@ApiOkResponse({ type: UpdatedSleepStatusDto })
	@ApiErrorResponse(
		HttpStatus.BAD_REQUEST,
		ERROR_MESSAGES.SLEEP_ENTRY.INVALID_TIME_RANGE,
	)
	@HttpCode(HttpStatus.OK)
	public async updateSleepStatus(
		@Authorized('id') userId: string,
		@Body() dto: UpdateUserSleepStatusDto,
	): Promise<UpdatedSleepStatusDto> {
		return await this.userSleepStatusService.updateSleepStatus(userId, dto);
	}

	/** Reset user sleep status (set isSleeping to false and sleepStart to null) */
	@Patch('reset')
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.USER_SLEEP_STATUS.RESET)
	public async resetSleepStatus(
		@Authorized('id') userId: string,
	): Promise<MessageResponse> {
		await this.userSleepStatusService.resetSleepStatus(userId);

		return SUCCESS_MESSAGES.USER_SLEEP_STATUS.RESET;
	}
}
