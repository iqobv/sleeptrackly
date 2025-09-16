import { Body, Controller, Get, Patch } from '@nestjs/common';
import { Auth, Authorized } from 'src/libs/decorators';
import { UpdateUserSleepStatusDto } from './dto';
import { UserSleepStatusService } from './user-sleep-status.service';

@Controller('sleep')
export class UserSleepStatusController {
	constructor(
		private readonly userSleepStatusService: UserSleepStatusService,
	) {}

	@Auth()
	@Get('me')
	async getSleepStatus(@Authorized('id') userId: string) {
		return this.userSleepStatusService.getSleepStatus(userId);
	}

	@Auth()
	@Patch('me')
	async updateSleepStatus(
		@Authorized('id') userId: string,
		@Body() dto: UpdateUserSleepStatusDto,
	) {
		const { clickedBy } = dto;

		typeof clickedBy;

		return this.userSleepStatusService.updateSleepStatus(
			userId,
			clickedBy ?? new Date(),
		);
	}
}
