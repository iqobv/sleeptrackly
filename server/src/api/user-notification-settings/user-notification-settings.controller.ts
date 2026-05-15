import { Auth, Authorized } from '@libs/decorators';
import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
	UpdateUserNotificationSettingsDto,
	UserNotificationSettingsDto,
} from './dto';
import { UserNotificationSettingsService } from './user-notification-settings.service';

@ApiTags('User Notification Settings')
@Controller('settings/notifications')
export class UserNotificationSettingsController {
	constructor(
		private readonly userNotificationSettingsService: UserNotificationSettingsService,
	) {}

	@Auth()
	@ApiOperation({ summary: 'Get current user notification settings' })
	@ApiOkResponse({
		type: UserNotificationSettingsDto,
	})
	@Get('me')
	async getUserNotificationSettings(@Authorized('id') userId: string) {
		return this.userNotificationSettingsService.findByUserId(userId);
	}

	@Auth()
	@ApiOperation({ summary: 'Update current user notification settings' })
	@ApiOkResponse({
		type: UserNotificationSettingsDto,
	})
	@Patch()
	async update(
		@Authorized('id') userId: string,
		@Body() dto: UpdateUserNotificationSettingsDto,
	) {
		return await this.userNotificationSettingsService.update(userId, dto);
	}
}
