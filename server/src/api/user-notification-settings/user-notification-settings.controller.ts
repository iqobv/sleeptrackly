import { Auth, Authorized } from '@libs/decorators';
import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
	UpdateUserNotificationSettingsDto,
	UserNotificationSettingsDto,
} from './dto';
import { UserNotificationSettingsService } from './services';

@Auth()
@ApiTags('User Notification Settings')
@Controller('settings/notifications')
export class UserNotificationSettingsController {
	constructor(
		private readonly userNotificationSettingsService: UserNotificationSettingsService,
	) {}

	/** Get current user notification settings */
	@Get('me')
	@ApiOkResponse({ type: UserNotificationSettingsDto })
	public async getUserNotificationSettings(
		@Authorized('id') userId: string,
	): Promise<UserNotificationSettingsDto> {
		return await this.userNotificationSettingsService.findOrCreate(userId);
	}

	/** Update current user notification settings */
	@Patch()
	@ApiOkResponse({ type: UserNotificationSettingsDto })
	public async update(
		@Authorized('id') userId: string,
		@Body() dto: UpdateUserNotificationSettingsDto,
	): Promise<UserNotificationSettingsDto> {
		return await this.userNotificationSettingsService.update(userId, dto);
	}
}
