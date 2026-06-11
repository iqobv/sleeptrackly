import type { User } from '@generated/prisma/client';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { ApiErrorResponse } from '@libs/decorators/api-response.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { OptionalAuth } from '@libs/decorators/optional-auth.decorator';
import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProfileDto } from './dto/profile.dto';
import { ProfileService } from './profile.service';

@ApiTags('Profile')
@Controller('profiles')
export class ProfileController {
	constructor(private readonly profileService: ProfileService) {}

	/** Get profile by username */
	@Get(':username')
	@OptionalAuth()
	@ApiOkResponse({ type: ProfileDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.PROFILE.NOT_FOUND)
	public async getProfile(
		@Param('username') username: string,
		@Authorized() user: User,
	): Promise<ProfileDto> {
		return await this.profileService.getProfileByUsername(username, user);
	}
}
