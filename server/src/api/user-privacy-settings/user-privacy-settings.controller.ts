import { Auth, Authorized } from '@libs/decorators';
import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BaseUserPrivacySettingsDto, UpdateUserPrivacySettings } from './dto';
import { UserPrivacySettingsService } from './user-privacy-settings.service';

@Auth()
@ApiTags('User Privacy Settings')
@Controller('user-privacy-settings')
export class UserPrivacySettingsController {
	constructor(
		private readonly userPrivacySettingsService: UserPrivacySettingsService,
	) {}

	/** Get user privacy settings */
	@Get('me')
	@ApiOkResponse({ type: BaseUserPrivacySettingsDto })
	public async getUserPrivacySettings(
		@Authorized('id') userId: string,
	): Promise<BaseUserPrivacySettingsDto> {
		return await this.userPrivacySettingsService.getUserPrivacySettings(userId);
	}

	/** Update user privacy settings */
	@Patch('me')
	@ApiOkResponse({ type: BaseUserPrivacySettingsDto })
	public async updateUserPrivacySettings(
		@Authorized('id') userId: string,
		@Body() dto: UpdateUserPrivacySettings,
	): Promise<BaseUserPrivacySettingsDto> {
		return await this.userPrivacySettingsService.updateUserPrivacySettings(
			userId,
			dto,
		);
	}
}
