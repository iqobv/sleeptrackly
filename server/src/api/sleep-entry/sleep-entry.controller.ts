import { Controller, Get, Query } from '@nestjs/common';
import { Auth, Authorized } from 'src/libs/decorators';
import { QueryDto } from './dto';
import { SleepEntryService } from './sleep-entry.service';

@Controller('sleep-entries')
export class SleepEntryController {
	constructor(private readonly sleepEntryService: SleepEntryService) {}

	@Auth()
	@Get('/me')
	async getSleepsEntryForWeek(
		@Authorized('id') userId: string,
		@Query() query: QueryDto,
	) {
		return await this.sleepEntryService.getSleepsEntryForWeek(userId, query);
	}
}
