import { Auth, Authorized } from '@libs/decorators';
import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
	UpdatedSleepStatusDto,
	UpdateUserSleepStatusDto,
	UserSleepStatusDto,
} from './dto';
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
		return this.userSleepStatusService.getSleepStatus(userId);
	}

	/** Update user sleep status (start/stop sleep) */
	@Patch('me')
	@ApiOkResponse({ type: UpdatedSleepStatusDto })
	public async updateSleepStatus(
		@Authorized('id') userId: string,
		@Body() dto: UpdateUserSleepStatusDto,
	): Promise<UpdatedSleepStatusDto> {
		return this.userSleepStatusService.updateSleepStatus(userId, dto);
	}
}
