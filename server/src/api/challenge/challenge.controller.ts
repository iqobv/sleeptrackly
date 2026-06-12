import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
} from '@libs/decorators/api-response.decorator';
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
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ChallengeService } from './challenge.service';
import { ChallengeDto, ChallengeFullDto } from './dto/challenge.dto';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';

@ApiTags('Challenge')
@Controller('challenges')
export class ChallengeController {
	constructor(private readonly challengeService: ChallengeService) {}

	/** Create new challenge */
	@Auth()
	@ApiCreatedResponse({ type: ChallengeDto })
	@ApiErrorResponse(HttpStatus.BAD_REQUEST, [
		ERROR_MESSAGES.CHALLENGE.START_DATE_PAST,
		ERROR_MESSAGES.CHALLENGE.END_DATE_PAST,
		ERROR_MESSAGES.CHALLENGE.INVALID_DATE_RANGE,
	])
	@HttpCode(HttpStatus.CREATED)
	@Post()
	public async create(
		@Authorized('id') userId: string,
		@Body() dto: CreateChallengeDto,
	): Promise<ChallengeDto> {
		return await this.challengeService.create(userId, dto);
	}

	/** Get all user's challenges */
	@Auth()
	@ApiOkResponse({ type: [ChallengeDto] })
	@Get('me')
	public async findAll(
		@Authorized('id') userId: string,
	): Promise<ChallengeDto[]> {
		return await this.challengeService.findAll(userId);
	}

	/** Get challenge by id */
	@Auth()
	@ApiOkResponse({ type: ChallengeFullDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.CHALLENGE.NOT_FOUND)
	@Get(':id')
	public async findById(
		@Authorized('id') userId: string,
		@Param('id') id: string,
	): Promise<ChallengeFullDto> {
		return await this.challengeService.findById(id, userId);
	}

	/** Update challenge */
	@Auth()
	@ApiOkResponse({ type: ChallengeDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.CHALLENGE.NOT_FOUND)
	@Patch(':id')
	public async update(
		@Authorized('id') userId: string,
		@Param('id') id: string,
		@Body() dto: UpdateChallengeDto,
	): Promise<ChallengeDto> {
		return await this.challengeService.update(id, userId, dto);
	}

	/** Delete challenge */
	@Auth()
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.CHALLENGE.DELETED)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.CHALLENGE.NOT_FOUND)
	@Delete(':id')
	public async remove(
		@Authorized('id') userId: string,
		@Param('id') id: string,
	): Promise<MessageResponse> {
		return await this.challengeService.remove(id, userId);
	}
}
