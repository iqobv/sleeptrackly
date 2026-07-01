import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { ApiErrorResponse } from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
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
	@Get('me')
	@ApiOkResponse({ type: UserSleepStatusDto })
	public async getSleepStatus(
		@Authorized('id') userId: string,
	): Promise<UserSleepStatusDto | null> {
		return await this.userSleepStatusService.getSleepStatus(userId);
	}

	/** Update user sleep status (start/stop sleep) */
	@Patch('me')
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
}
