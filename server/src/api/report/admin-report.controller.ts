import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import {
	ApiBadRequestResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/libs/decorators';
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
	@ApiNotFoundResponse({ description: 'Report not found' })
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
	@ApiNotFoundResponse({ description: 'Report not found' })
	@ApiBadRequestResponse({ description: 'Status is the same' })
	@Patch(':id')
	async update(@Param('id') id: string, @Body() dto: UpdateReportDto) {
		return await this.reportService.update(id, dto);
	}
}
