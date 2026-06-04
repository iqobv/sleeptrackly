import { ERROR_MESSAGES } from '@libs/constants';
import { ApiErrorResponse, Auth, Authorized } from '@libs/decorators';
import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { WeeklySummaryDto } from './dto';
import { WeeklySummaryService } from './weekly-summary.service';

@ApiTags('Weekly Summaries')
@Controller('weekly-summaries')
export class WeeklySummaryController {
	constructor(private readonly weeklySummaryService: WeeklySummaryService) {}

	/** Get weekly summary by ID */
	@Get(':id')
	@Auth()
	@ApiOkResponse({ type: WeeklySummaryDto })
	@ApiErrorResponse(
		HttpStatus.NOT_FOUND,
		ERROR_MESSAGES.WEEKLY_SUMMARY.NOT_FOUND,
	)
	public async getSummaryById(
		@Param('id') summaryId: string,
		@Authorized('id') userId: string,
	): Promise<WeeklySummaryDto> {
		return await this.weeklySummaryService.getSummaryById(userId, summaryId);
	}
}
