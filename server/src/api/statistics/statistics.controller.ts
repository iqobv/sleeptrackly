import { UserRole } from '@generated/prisma/enums';
import { Auth } from '@libs/decorators/auth.decorator';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StatisticsQueryDto } from './dto/statistics-query.dto';
import { StatisticsDto } from './dto/statistics.dto';
import { StatisticsService } from './services/statistics.service';

@Auth(UserRole.ADMIN)
@ApiTags('Statistics')
@Controller('statistics')
export class StatisticsController {
	constructor(private readonly statisticsService: StatisticsService) {}

	/** Get statistics for a specific date */
	@Get()
	@ApiOkResponse({ type: StatisticsDto })
	public async getStatistics(
		@Query() query: StatisticsQueryDto,
	): Promise<StatisticsDto> {
		return await this.statisticsService.getStatistics(query);
	}
}
