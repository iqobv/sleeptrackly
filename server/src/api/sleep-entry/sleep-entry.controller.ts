import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth, Authorized } from 'src/libs/decorators';
import { QueryDto, SleepDashboardDto } from './dto';
import { SleepEntryService } from './sleep-entry.service';

@ApiTags('Sleep Entry')
@Controller('sleep-entries')
export class SleepEntryController {
	constructor(private readonly sleepEntryService: SleepEntryService) {}

	@ApiOperation({ summary: 'Get sleep entries for week' })
	@ApiOkResponse({ type: SleepDashboardDto })
	@Auth()
	@Get('/me')
	async getSleepsEntryForWeek(
		@Authorized('id') userId: string,
		@Query() query: QueryDto,
	) {
		return await this.sleepEntryService.getSleepsEntryForWeek(userId, query);
	}
}
