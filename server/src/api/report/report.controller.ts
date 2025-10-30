import { Body, Controller, Post } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiOkResponse,
	ApiOperation,
} from '@nestjs/swagger';
import { Auth, Authorized } from 'src/libs/decorators';
import { CreateReportDto, ReportDto } from './dto';
import { ReportService } from './report.service';

@Controller('reports')
export class ReportController {
	constructor(private readonly reportService: ReportService) {}

	@ApiOperation({ summary: 'Send report' })
	@ApiBadRequestResponse({ description: 'You can send a report once per hour' })
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
