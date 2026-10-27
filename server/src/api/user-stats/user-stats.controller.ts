import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { Controller, Post } from '@nestjs/common';
import { UserStatsDto } from './dto/user-stats.dto';
import { UserStatsService } from './user-stats.service';

@Controller('user-stats')
export class UserStatsController {
	constructor(private readonly userStatsService: UserStatsService) {}

	@Auth()
	@Post('sync')
	public async test(@Authorized('id') userId: string): Promise<UserStatsDto> {
		return await this.userStatsService.syncUserStats(userId);
	}
}
