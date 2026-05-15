import { Auth, Authorized } from '@libs/decorators';
import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateUserPrivacySettings, UserPrivacySettingsDto } from './dto';
import { UserPrivacySettingsService } from './user-privacy-settings.service';

@ApiTags('User Privacy Settings')
@Controller('user-privacy-settings')
export class UserPrivacySettingsController {
	constructor(
		private readonly userPrivacySettingsService: UserPrivacySettingsService,
	) {}

	@Auth()
	@Get('me')
	@ApiOperation({
		summary: 'Get user privacy settings',
	})
	@ApiOkResponse({ type: UserPrivacySettingsDto })
	async getUserPrivacySettings(@Authorized('id') userId: string) {
		return await this.userPrivacySettingsService.getUserPrivacySettings(userId);
	}

	@Auth()
	@Patch('me')
	@ApiOperation({
		summary: 'Update user privacy settings',
	})
	@ApiOkResponse({ type: UserPrivacySettingsDto })
	async updateUserPrivacySettings(
		@Authorized('id') userId: string,
		@Body() dto: UpdateUserPrivacySettings,
	) {
		return await this.userPrivacySettingsService.updateUserPrivacySettings(
			userId,
			dto,
		);
	}
}
