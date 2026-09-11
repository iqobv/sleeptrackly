import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';
import { ApiSuccessResponse } from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateSleepEntryDto } from './dto/create-sleep-entry.dto';
import { QueryDto } from './dto/query.dto';
import { SleepDashboardDto } from './dto/sleep-dashboard.dto';
import { SleepEntryDto } from './dto/sleep-entry.dto';
import { UpdateSleepEntryDto } from './dto/update-sleep-entry.dto';
import { SleepEntryService } from './sleep-entry.service';

@Auth()
@ApiTags('Sleep Entry')
@Controller('sleep-entries')
export class SleepEntryController {
	constructor(private readonly sleepEntryService: SleepEntryService) {}

	/** Get sleep entries for week */
	@Get('me')
	@ApiOkResponse({ type: SleepDashboardDto })
	public async getSleepsEntryForWeek(
		@Authorized('id') userId: string,
		@Query() query: QueryDto,
	): Promise<SleepDashboardDto> {
		return await this.sleepEntryService.getSleepsEntryForWeek(userId, query);
	}

	/** Create sleep entry */
	@Post()
	@ApiOkResponse({ type: SleepEntryDto })
	public async createSleepEntry(
		@Authorized('id') userId: string,
		@Body() dto: CreateSleepEntryDto,
	): Promise<SleepEntryDto> {
		return await this.sleepEntryService.createSleepEntry(userId, {
			...dto,
			isVerified: false,
		});
	}

	/** Update sleep entry */
	@Patch(':id')
	@ApiOkResponse({ type: SleepEntryDto })
	public async updateSleepEntry(
		@Param('id') id: string,
		@Authorized('id') userId: string,
		@Body() dto: UpdateSleepEntryDto,
	): Promise<SleepEntryDto> {
		return await this.sleepEntryService.updateSleepEntry(id, userId, dto);
	}

	/** Delete sleep entry */
	@Delete(':id')
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.SLEEP_ENTRY.DELETED)
	@HttpCode(HttpStatus.OK)
	public async deleteSleepEntry(
		@Param('id') id: string,
		@Authorized('id') userId: string,
	): Promise<MessageResponse> {
		return await this.sleepEntryService.deleteSleepEntry(id, userId);
	}
}
