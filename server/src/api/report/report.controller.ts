import { ERROR_MESSAGES } from '@libs/constants';
import { ApiErrorResponse, Auth, Authorized } from '@libs/decorators';
import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateReportDto, ReportDto } from './dto';
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
