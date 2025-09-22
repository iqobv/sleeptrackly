import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ProfileDto } from './dto';
import { ProfileService } from './profile.service';

@Controller('profiles')
export class ProfileController {
	constructor(private readonly profileService: ProfileService) {}

	@ApiOperation({ summary: 'Get profile by username' })
	@ApiOkResponse({ type: ProfileDto })
	@Get(':username')
	async getProfile(@Param('username') username: string) {
		return await this.profileService.getProfileByUsername(username);
	}
}
