import { UserRole } from '@generated/prisma/enums';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
	Auth,
	Authorized,
} from '@libs/decorators';
import { MessageResponse } from '@libs/types';
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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
	CreaeteUserSanctionDto,
	UpdateUserSanctionDto,
	UserSanctionDto,
} from './dto';
import { UserSanctionService } from './user-sanction.service';

@Auth(UserRole.ADMIN)
@ApiTags('Admin User Sanction')
@Controller('admin/user-sanctions')
export class AdminUserSanctionController {
	constructor(private readonly userSanctionService: UserSanctionService) {}

	/** Get all sanctions for a specific user */
	@Get('user/:userId')
	@ApiOkResponse({ type: [UserSanctionDto] })
	public async findByUserId(
		@Param('userId') userId: string,
	): Promise<UserSanctionDto[]> {
		return await this.userSanctionService.findByUserId(userId);
	}

	/** Get a specific sanction by its ID */
	@Get('id/:id')
	@ApiOkResponse({ type: UserSanctionDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.SANCTION.NOT_FOUND)
	public async findById(@Param('id') id: string): Promise<UserSanctionDto> {
		return await this.userSanctionService.findById(id);
	}

	/** Create a new sanction for a user */
	@Post()
	@ApiOkResponse({ type: UserSanctionDto })
	@ApiErrorResponse(HttpStatus.BAD_REQUEST, [
		ERROR_MESSAGES.SANCTION.START_DATE_MUST_BE_BEFORE_END_DATE,
		ERROR_MESSAGES.SANCTION.END_DATE_MUST_BE_IN_THE_FUTURE,
	])
	public async create(
		@Authorized('id') userId: string,
		@Body() dto: CreaeteUserSanctionDto,
	): Promise<UserSanctionDto> {
		return await this.userSanctionService.create(userId, dto);
	}

	/** Update an existing sanction */
	@Patch(':id')
	@ApiOkResponse({ type: UserSanctionDto })
	@ApiErrorResponse(
		HttpStatus.BAD_REQUEST,
		ERROR_MESSAGES.SANCTION.END_DATE_MUST_BE_IN_THE_FUTURE,
	)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.SANCTION.NOT_FOUND)
	public async update(
		@Param('id') id: string,
		@Body() dto: UpdateUserSanctionDto,
	): Promise<UserSanctionDto> {
		return await this.userSanctionService.update(id, dto);
	}

	/** Remove a sanction by its ID */
	@Delete(':id')
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.SANCTION.DELETED)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.SANCTION.NOT_FOUND)
	public async remove(@Param('id') id: string): Promise<MessageResponse> {
		return await this.userSanctionService.remove(id);
	}
}
