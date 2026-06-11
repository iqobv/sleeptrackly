import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { ApiErrorResponse } from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { WeeklySummaryDto } from './dto/weekly-summary.dto';
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
