import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
	Auth,
	Authorized,
	Cookie,
} from '@libs/decorators';
import {
	BadRequestException,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SessionDto } from './dto';
import { SessionService } from './session.service';

@ApiTags('Session')
@Controller('auth/sessions')
export class SessionController {
	constructor(private readonly sessionService: SessionService) {}

	@ApiOperation({ summary: 'Get all sessions' })
	@ApiOkResponse({ type: [SessionDto] })
	@ApiErrorResponse(
		HttpStatus.UNAUTHORIZED,
		ERROR_MESSAGES.AUTH.REFRESH_TOKEN_MISSING,
	)
	@Auth()
	@Get('all')
	async getAllSessions(
		@Authorized('id') userId: string,
		@Cookie('refreshToken') refreshToken?: string,
	) {
		if (!refreshToken)
			throw new BadRequestException(ERROR_MESSAGES.AUTH.REFRESH_TOKEN_MISSING);

		return await this.sessionService.getUserSessions(userId, refreshToken);
	}

	@ApiOperation({ summary: 'Terminate all sessions' })
	@Auth()
	@ApiErrorResponse(
		HttpStatus.UNAUTHORIZED,
		ERROR_MESSAGES.AUTH.REFRESH_TOKEN_MISSING,
	)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.SESSION.NOT_FOUND)
	@ApiSuccessResponse(
		HttpStatus.OK,
		SUCCESS_MESSAGES.SESSION.OTHER_SESSIONS_DELETED,
	)
	@HttpCode(HttpStatus.OK)
	@Delete('all-other')
	async terminateAllSessions(
		@Authorized('id') userId: string,
		@Cookie('refreshToken') refreshToken?: string,
	) {
		if (!refreshToken)
			throw new BadRequestException(ERROR_MESSAGES.AUTH.REFRESH_TOKEN_MISSING);

		return await this.sessionService.deleteAllOtherSessions(
			userId,
			refreshToken,
		);
	}

	@ApiOperation({ summary: 'Terminate session' })
	@Auth()
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.SESSION.NOT_FOUND)
	@ApiErrorResponse(
		HttpStatus.FORBIDDEN,
		ERROR_MESSAGES.SESSION.DELETE_FORBIDDEN,
	)
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.SESSION.SESSION_DELETED)
	@HttpCode(HttpStatus.OK)
	@Delete('id/:id')
	async terminateSession(
		@Authorized('id') userId: string,
		@Param('id') sessionId: string,
	) {
		return await this.sessionService.deleteSession(userId, sessionId);
	}
}
