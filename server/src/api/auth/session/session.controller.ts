import { Controller, Delete, Get, Param, Req } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import { Auth, Authorized } from 'src/libs/decorators';
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
	async getAllSessions(@Authorized('id') userId: string, @Req() req: Request) {
		return await this.sessionService.getAllSessions(userId, req.sessionID);
	}

	@ApiOperation({ summary: 'Terminate session' })
	@ApiOkResponse({ type: Boolean })
	@Auth()
	@Delete('session/:sessionId')
	async terminateSession(
		@Authorized('id') userId: string,
		@Param('sessionId') sessionId: string,
	) {
		return await this.sessionService.terminateSession(userId, sessionId);
	}

	@ApiOperation({ summary: 'Terminate all sessions' })
	@ApiOkResponse({ type: Boolean })
	@Auth()
	@Delete('except/:exceptId')
	async terminateAllSessions(
		@Authorized('id') userId: string,
		@Param('exceptId') exceptId: string,
	) {
		return await this.sessionService.terminateAllSessions(userId, exceptId);
	}
}
