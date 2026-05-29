import type { User } from '@generated/prisma/client';
import { ERROR_MESSAGES } from '@libs/constants';
import { ApiErrorResponse, Authorized, OptionalAuth } from '@libs/decorators';
import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProfileDto } from './dto';
import { ProfileService } from './profile.service';

@ApiTags('Profile')
@Controller('profiles')
export class ProfileController {
	constructor(private readonly profileService: ProfileService) {}

	@OptionalAuth()
	@ApiOperation({ summary: 'Get profile by username' })
	@ApiOkResponse({ type: ProfileDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.PROFILE.NOT_FOUND)
	@Get(':username')
	async getProfile(
		@Param('username') username: string,
		@Authorized() user: User,
	) {
		return await this.profileService.getProfileByUsername(username, user);
	}
}
