import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth, Authorized } from 'src/libs/decorators';
import {
	SleepStatusDto,
	UpdatedSleepStatusDto,
	UpdateUserSleepStatusDto,
} from './dto';
import { UserSleepStatusService } from './user-sleep-status.service';

@ApiTags('User Sleep Status')
@Controller('sleep')
export class UserSleepStatusController {
	constructor(
		private readonly userSleepStatusService: UserSleepStatusService,
	) {}

	@ApiOperation({ summary: 'Get sleep status' })
	@ApiOkResponse({ type: SleepStatusDto })
	@Auth()
	@Get('me')
	async getSleepStatus(@Authorized('id') userId: string) {
		return this.userSleepStatusService.getSleepStatus(userId);
	}

	@ApiOperation({ summary: 'Update sleep status' })
	@ApiOkResponse({ type: UpdatedSleepStatusDto })
	@Auth()
	@Patch('me')
	async updateSleepStatus(
		@Authorized('id') userId: string,
		@Body() dto: UpdateUserSleepStatusDto,
	) {
		const { clickedBy } = dto;

		return this.userSleepStatusService.updateSleepStatus(
			userId,
			clickedBy ?? new Date(),
		);
	}
}
