import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { ApiErrorResponse } from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportDto } from './dto/report.dto';
import { ReportService } from './report.service';

@Auth()
@ApiTags('Report')
@Controller('reports')
export class ReportController {
	constructor(private readonly reportService: ReportService) {}

	/** Send a report */
	@Post('/send')
	@ApiOkResponse({ type: ReportDto })
	@ApiErrorResponse(
		HttpStatus.BAD_REQUEST,
		ERROR_MESSAGES.REPORT.YOU_CAN_SEND_A_REPORT_ONCE_PER_HOUR,
	)
	public async sendReport(
		@Authorized('id') userId: string,
		@Body() dto: CreateReportDto,
	): Promise<ReportDto> {
		return await this.reportService.create(userId, dto);
	}
}
