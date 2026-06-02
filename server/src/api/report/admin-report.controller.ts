import { UserRole } from '@generated/prisma/enums';
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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
	AllReportsDto,
	FullReportDto,
	ReportDto,
	SearchQueryDto,
	UpdateReportDto,
} from './dto';
import { ReportService } from './report.service';

@Auth(UserRole.ADMIN)
@ApiTags('Admin Report')
@Controller('admin/reports')
export class AdminReportController {
	constructor(private readonly reportService: ReportService) {}

	/** Get a report by id */
	@Get(':id')
	@ApiOkResponse({ type: FullReportDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.REPORT.NOT_FOUND)
	public async findById(@Param('id') id: string): Promise<FullReportDto> {
		return await this.reportService.findById(id);
	}

	/** Get all reports */
	@Get()
	@ApiOkResponse({ type: AllReportsDto })
	public async getAll(@Query() dto: SearchQueryDto): Promise<AllReportsDto> {
		return await this.reportService.findAll(dto);
	}

	/** Update a report */
	@Patch(':id')
	@ApiOkResponse({ type: ReportDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.REPORT.NOT_FOUND)
	@ApiErrorResponse(HttpStatus.BAD_REQUEST, [
		ERROR_MESSAGES.REPORT.STATUS_IS_THE_SAME,
		ERROR_MESSAGES.REPORT.CANNOT_CHANGE_STATUS_TO_PENDING,
	])
	public async update(
		@Param('id') id: string,
		@Authorized('id') userId: string,
		@Body() dto: UpdateReportDto,
	): Promise<ReportDto> {
		return await this.reportService.update(id, userId, dto);
	}
}
