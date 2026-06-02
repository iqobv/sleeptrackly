import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
	Auth,
	Authorized,
	Cookie,
} from '@libs/decorators';
import { MessageResponse } from '@libs/types';
import {
	BadRequestException,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SessionDto } from './dto';
import { SessionService } from './session.service';

@Auth()
@ApiTags('Session')
@Controller('auth/sessions')
export class SessionController {
	constructor(private readonly sessionService: SessionService) {}

	/** Get all sessions */
	@Get('all')
	@ApiOkResponse({ type: [SessionDto] })
	@ApiErrorResponse(
		HttpStatus.UNAUTHORIZED,
		ERROR_MESSAGES.AUTH.REFRESH_TOKEN_MISSING,
	)
	public async getAllSessions(
		@Authorized('id') userId: string,
		@Cookie('refreshToken') refreshToken?: string,
	): Promise<SessionDto[]> {
		if (!refreshToken)
			throw new BadRequestException(ERROR_MESSAGES.AUTH.REFRESH_TOKEN_MISSING);

		return await this.sessionService.getUserSessions(userId, refreshToken);
	}

	/** Terminate all sessions */
	@Delete('all-other')
	@ApiSuccessResponse(
		HttpStatus.OK,
		SUCCESS_MESSAGES.SESSION.OTHER_SESSIONS_DELETED,
	)
	@ApiErrorResponse(
		HttpStatus.UNAUTHORIZED,
		ERROR_MESSAGES.AUTH.REFRESH_TOKEN_MISSING,
	)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.SESSION.NOT_FOUND)
	@HttpCode(HttpStatus.OK)
	public async terminateAllSessions(
		@Authorized('id') userId: string,
		@Cookie('refreshToken') refreshToken?: string,
	): Promise<MessageResponse> {
		if (!refreshToken)
			throw new BadRequestException(ERROR_MESSAGES.AUTH.REFRESH_TOKEN_MISSING);

		return await this.sessionService.deleteAllOtherSessions(
			userId,
			refreshToken,
		);
	}

	/** Terminate session by id */
	@Delete('id/:id')
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.SESSION.SESSION_DELETED)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.SESSION.NOT_FOUND)
	@ApiErrorResponse(
		HttpStatus.FORBIDDEN,
		ERROR_MESSAGES.SESSION.DELETE_FORBIDDEN,
	)
	@HttpCode(HttpStatus.OK)
	public async terminateSession(
		@Authorized('id') userId: string,
		@Param('id') sessionId: string,
	): Promise<MessageResponse> {
		return await this.sessionService.deleteSession(userId, sessionId);
	}
}
