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
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ChallengeDto, ChallengeWithUserStatusDto } from '../dto/challenge.dto';
import { FullUserChallengeDto } from '../dto/user-challenge.dto';
import { ChallengeService } from '../services/challenge.service';

@Auth()
@ApiTags('Challenge')
@Controller('challenges')
export class ChallengeController {
	constructor(private readonly challengeService: ChallengeService) {}

	/** Get all challenges for the current user */
	@Get()
	@ApiOkResponse({ type: [FullUserChallengeDto] })
	public async findUserChallenges(
		@Authorized('id') userId: string,
	): Promise<FullUserChallengeDto[]> {
		return await this.challengeService.findUserChallenges(userId);
	}

	/** Get all available challenges for the current user */
	@Get('available')
	@ApiOkResponse({ type: [ChallengeDto] })
	public async findAvailableChallenges(
		@Authorized('id') userId: string,
	): Promise<ChallengeDto[]> {
		return await this.challengeService.findAvailableChallenges(userId);
	}

	/** Get a specific challenge by ID for the current user */
	@Get(':id')
	@ApiOkResponse({ type: ChallengeWithUserStatusDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.CHALLENGE.NOT_FOUND)
	public async findChallengeById(
		@Param('id') id: string,
		@Authorized('id') userId: string,
	): Promise<ChallengeWithUserStatusDto> {
		return await this.challengeService.findFullChallengeById(id, userId);
	}

	/** Participate in a specific challenge by ID */
	@Post(':id/participate')
	@ApiSuccessResponse(
		HttpStatus.OK,
		SUCCESS_MESSAGES.CHALLENGE.PARTICIPATION_STARTED,
	)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, [
		ERROR_MESSAGES.USER.NOT_FOUND,
		ERROR_MESSAGES.CHALLENGE.NOT_FOUND,
	])
	@ApiErrorResponse(
		HttpStatus.CONFLICT,
		ERROR_MESSAGES.CHALLENGE.ALREADY_PARTICIPATING,
	)
	@ApiErrorResponse(HttpStatus.BAD_REQUEST, [
		ERROR_MESSAGES.CHALLENGE.NOT_STARTED,
		ERROR_MESSAGES.CHALLENGE.ALREADY_ENDED,
		ERROR_MESSAGES.CHALLENGE.NOT_AVAILABLE,
	])
	@HttpCode(HttpStatus.OK)
	public async participateInChallenge(
		@Param('id') id: string,
		@Authorized('id') userId: string,
	): Promise<MessageResponse> {
		await this.challengeService.participateInChallenge(id, userId);

		return SUCCESS_MESSAGES.CHALLENGE.PARTICIPATION_STARTED;
	}
}
