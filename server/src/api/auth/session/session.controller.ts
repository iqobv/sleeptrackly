import { Auth, Authorized, Cookie } from '@libs/decorators';
import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SessionDto } from './dto';
import { SessionService } from './session.service';

@ApiTags('Session')
@Controller('auth/sessions')
export class SessionController {
	constructor(private readonly sessionService: SessionService) {}

	@ApiOperation({ summary: 'Get all sessions' })
	@ApiOkResponse({ type: [SessionDto] })
	@Auth()
	@Get('all')
	async getAllSessions(
		@Authorized('id') userId: string,
		@Cookie('refreshToken') refreshToken: string,
	) {
		return await this.sessionService.getUserSessions(userId, refreshToken);
	}

	@ApiOperation({ summary: 'Terminate session' })
	@ApiOkResponse({ type: Boolean })
	@Auth()
	@Delete(':id')
	async terminateSession(
		@Authorized('id') userId: string,
		@Param('id') sessionId: string,
	) {
		return await this.sessionService.deleteSession(userId, sessionId);
	}

	@ApiOperation({ summary: 'Terminate all sessions' })
	@ApiOkResponse({ type: Boolean })
	@Auth()
	@Delete('all-other')
	async terminateAllSessions(
		@Authorized('id') userId: string,
		@Cookie('refreshToken') refreshToken: string,
	) {
		return await this.sessionService.deleteAllOtherSessions(
			userId,
			refreshToken,
		);
	}
}
