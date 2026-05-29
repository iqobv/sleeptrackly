import { ERROR_MESSAGES } from '@libs/constants';
import { ApiErrorResponse, Auth, Authorized } from '@libs/decorators';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateReportDto, ReportDto } from './dto';
import { ReportService } from './report.service';

@ApiTags('Report')
@Controller('reports')
export class ReportController {
	constructor(private readonly reportService: ReportService) {}

	@ApiOperation({ summary: 'Send report' })
	@ApiErrorResponse(
		HttpStatus.BAD_REQUEST,
		ERROR_MESSAGES.REPORT.YOU_CAN_SEND_A_REPORT_ONCE_PER_HOUR,
	)
	@ApiOkResponse({ type: ReportDto })
	@Auth()
	@Post('/send')
	async sendReport(
		@Authorized('id') userId: string,
		@Body() dto: CreateReportDto,
	) {
		return await this.reportService.create(userId, dto);
	}
}
