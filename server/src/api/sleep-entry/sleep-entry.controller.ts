import { Auth, Authorized } from '@libs/decorators';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QueryDto, SleepDashboardDto } from './dto';
import { SleepEntryService } from './sleep-entry.service';

@Auth()
@ApiTags('Sleep Entry')
@Controller('sleep-entries')
export class SleepEntryController {
	constructor(private readonly sleepEntryService: SleepEntryService) {}

	/** Get sleep entries for week */
	@Get('/me')
	@ApiOkResponse({ type: SleepDashboardDto })
	public async getSleepsEntryForWeek(
		@Authorized('id') userId: string,
		@Query() query: QueryDto,
	): Promise<SleepDashboardDto> {
		return await this.sleepEntryService.getSleepsEntryForWeek(userId, query);
	}
}
