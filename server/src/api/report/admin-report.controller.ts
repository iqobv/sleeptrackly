import { ERROR_MESSAGES } from '@libs/constants';
import { ApiErrorResponse, Auth, Authorized } from '@libs/decorators';
import {
	Body,
	Controller,
	Get,
	HttpStatus,
	Param,
	Patch,
	Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
	AllReportsDto,
	ReportDto,
	SearchQueryDto,
	UpdateReportDto,
} from './dto';
import { ReportService } from './report.service';

@ApiTags('Admin Report')
@Controller('admin/reports')
export class AdminReportController {
	constructor(private readonly reportService: ReportService) {}

	@Auth('ADMIN')
	@ApiOperation({ summary: 'Get report by id' })
	@ApiOkResponse({ type: ReportDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.REPORT.NOT_FOUND)
	@Get(':id')
	async findById(@Param('id') id: string) {
		return await this.reportService.findById(id);
	}

	@Auth('ADMIN')
	@ApiOperation({ summary: 'Get all reports' })
	@ApiOkResponse({ type: AllReportsDto })
	@Get()
	async getAll(@Query() dto: SearchQueryDto) {
		return await this.reportService.findAll(dto);
	}

	@Auth('ADMIN')
	@ApiOperation({ summary: 'Update report' })
	@ApiOkResponse({ type: ReportDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.REPORT.NOT_FOUND)
	@ApiErrorResponse(HttpStatus.BAD_REQUEST, [
		ERROR_MESSAGES.REPORT.STATUS_IS_THE_SAME,
		ERROR_MESSAGES.REPORT.CANNOT_CHANGE_STATUS_TO_PENDING,
	])
	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Authorized('id') userId: string,
		@Body() dto: UpdateReportDto,
	) {
		return await this.reportService.update(id, userId, dto);
	}
}
