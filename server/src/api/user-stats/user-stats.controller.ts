import { Controller } from '@nestjs/common';
import { UserStatsService } from './user-stats.service';

@Controller('user-stats')
export class UserStatsController {
	constructor(private readonly userStatsService: UserStatsService) {}
}
