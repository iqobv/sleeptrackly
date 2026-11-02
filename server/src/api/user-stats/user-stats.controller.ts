import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserStatsDto } from './dto/user-stats.dto';
import { UserStatsService } from './user-stats.service';

@Auth()
@ApiTags('User Stats')
@Controller('user-stats')
export class UserStatsController {
	constructor(private readonly userStatsService: UserStatsService) {}

	/** Get user stats */
	@Get()
	@ApiOkResponse({ type: UserStatsDto })
	public async getUserStats(
		@Authorized('id') userId: string,
	): Promise<UserStatsDto> {
		return await this.userStatsService.getUserStats(userId);
	}
}
