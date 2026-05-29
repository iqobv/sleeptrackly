import { ERROR_MESSAGES } from '@libs/constants';
import { ApiErrorResponse, Auth, Authorized } from '@libs/decorators';
import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { WeeklySummaryDto } from './dto';
import { WeeklySummaryService } from './weekly-summary.service';

@ApiTags('Weekly Summaries')
@Controller('weekly-summaries')
export class WeeklySummaryController {
	constructor(private readonly weeklySummaryService: WeeklySummaryService) {}

	@Auth()
	@Get(':id')
	@ApiOperation({
		summary: 'Get weekly summary by ID',
		description: 'Retrieves a specific weekly summary by its ID.',
	})
	@ApiErrorResponse(
		HttpStatus.NOT_FOUND,
		ERROR_MESSAGES.WEEKLY_SUMMARY.NOT_FOUND,
	)
	@ApiOkResponse({ type: WeeklySummaryDto })
	async getSummaryById(
		@Param('id') summaryId: string,
		@Authorized('id') userId: string,
	) {
		return await this.weeklySummaryService.getSummaryById(userId, summaryId);
	}
}
