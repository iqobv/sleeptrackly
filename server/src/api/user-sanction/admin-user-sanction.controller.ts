import { ERROR_MESSAGES } from '@libs/constants';
import { ApiErrorResponse, Auth, Authorized } from '@libs/decorators';
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
	CreaeteUserSanctionDto,
	UpdateUserSanctionDto,
	UserSanctionDto,
} from './dto';
import { UserSanctionService } from './user-sanction.service';

@ApiTags('Admin User Sanction')
@Controller('admin/user-sanctions')
export class AdminUserSanctionController {
	constructor(private readonly userSanctionService: UserSanctionService) {}

	@Auth('ADMIN')
	@ApiOperation({ summary: 'Get all sanctions for a specific user' })
	@ApiOkResponse({ type: [UserSanctionDto] })
	@Get('user/:userId')
	async findByUserId(@Param('userId') userId: string) {
		return await this.userSanctionService.findByUserId(userId);
	}

	@Auth('ADMIN')
	@ApiOperation({ summary: 'Get a specific sanction by its ID' })
	@ApiOkResponse({ type: UserSanctionDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.SANCTION.NOT_FOUND)
	@Get('id/:id')
	async findById(@Param('id') id: string) {
		return await this.userSanctionService.findById(id);
	}

	@Auth('ADMIN')
	@ApiOperation({ summary: 'Create a new sanction for a user' })
	@ApiOkResponse({ type: UserSanctionDto })
	@ApiErrorResponse(HttpStatus.BAD_REQUEST, [
		ERROR_MESSAGES.SANCTION.START_DATE_MUST_BE_BEFORE_END_DATE,
		ERROR_MESSAGES.SANCTION.END_DATE_MUST_BE_IN_THE_FUTURE,
	])
	@Post()
	async create(
		@Authorized('id') userId: string,
		@Body() dto: CreaeteUserSanctionDto,
	) {
		return await this.userSanctionService.create(userId, dto);
	}

	@Auth('ADMIN')
	@ApiOperation({ summary: 'Update an existing sanction' })
	@Patch(':id')
	@ApiErrorResponse(
		HttpStatus.BAD_REQUEST,
		ERROR_MESSAGES.SANCTION.END_DATE_MUST_BE_IN_THE_FUTURE,
	)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.SANCTION.NOT_FOUND)
	@ApiOkResponse({ type: UserSanctionDto })
	async update(@Param('id') id: string, @Body() dto: UpdateUserSanctionDto) {
		return await this.userSanctionService.update(id, dto);
	}

	@Auth('ADMIN')
	@ApiOperation({ summary: 'Remove a sanction by its ID' })
	@ApiOkResponse({ type: Boolean })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.SANCTION.NOT_FOUND)
	@Delete(':id')
	async remove(@Param('id') id: string) {
		return await this.userSanctionService.remove(id);
	}
}
