import { Auth, Authorized } from '@libs/decorators';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { WeeklySummaryDto } from './dto';
import { WeeklySummaryService } from './weekly-summary.service';

@Controller('weekly-summaries')
export class WeeklySummaryController {
	constructor(private readonly weeklySummaryService: WeeklySummaryService) {}

	@Auth()
	@Get(':id')
	@ApiNotFoundResponse({ description: 'Weekly summary not found' })
	@ApiOkResponse({ type: WeeklySummaryDto })
	async getSummaryById(
		@Param('id') summaryId: string,
		@Authorized('id') userId: string,
	) {
		return await this.weeklySummaryService.getSummaryById(userId, summaryId);
	}
}
