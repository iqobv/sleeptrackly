import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
	Auth,
	Authorized,
} from '@libs/decorators';
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
import {
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { ChallengeService } from './challenge.service';
import {
	ChallengeDto,
	ChallengeFullDto,
	CreateChallengeDto,
	UpdateChallengeDto,
} from './dto';

@ApiTags('Challenge')
@Controller('challenges')
export class ChallengeController {
	constructor(private readonly challengeService: ChallengeService) {}

	@ApiOperation({ summary: 'Create challenge' })
	@ApiCreatedResponse({ type: ChallengeDto })
	@ApiErrorResponse(HttpStatus.BAD_REQUEST, [
		ERROR_MESSAGES.CHALLENGE.START_DATE_PAST,
		ERROR_MESSAGES.CHALLENGE.END_DATE_PAST,
		ERROR_MESSAGES.CHALLENGE.INVALID_DATE_RANGE,
	])
	@Auth()
	@HttpCode(HttpStatus.CREATED)
	@Post()
	async create(
		@Authorized('id') userId: string,
		@Body() dto: CreateChallengeDto,
	) {
		return this.challengeService.create(userId, dto);
	}

	@ApiOperation({ summary: 'Get all challenges' })
	@ApiOkResponse({ type: [ChallengeDto] })
	@Auth()
	@Get('me')
	async findAll(@Authorized('id') userId: string) {
		return this.challengeService.findAll(userId);
	}

	@ApiOperation({ summary: 'Get challenge by id' })
	@ApiOkResponse({ type: ChallengeFullDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.CHALLENGE.NOT_FOUND)
	@Auth()
	@Get(':id')
	async findById(@Authorized('id') userId: string, @Param('id') id: string) {
		return this.challengeService.findById(id, userId);
	}

	@ApiOperation({ summary: 'Update challenge' })
	@ApiOkResponse({ type: UpdateChallengeDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.CHALLENGE.NOT_FOUND)
	@Auth()
	@Patch(':id')
	async update(
		@Authorized('id') userId: string,
		@Param('id') id: string,
		@Body() dto: UpdateChallengeDto,
	) {
		return await this.challengeService.update(id, userId, dto);
	}

	@ApiOperation({ summary: 'Delete challenge' })
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.CHALLENGE.DELETED)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.CHALLENGE.NOT_FOUND)
	@Auth()
	@Delete(':id')
	async remove(@Authorized('id') userId: string, @Param('id') id: string) {
		return await this.challengeService.remove(id, userId);
	}
}
