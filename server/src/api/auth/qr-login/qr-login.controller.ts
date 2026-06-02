import type { User } from '@generated/prisma/client';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
	Auth,
	Authorized,
	ClientInfo,
} from '@libs/decorators';
import { ClientInfoDto } from '@libs/dto';
import { MessageResponse } from '@libs/types';
import { setAuthCookies } from '@libs/utils';
import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Query,
	Res,
	Sse,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { Observable } from 'rxjs';
import { QrIdDto, QrStatusDto } from './dto';
import { QrLoginService } from './qr-login.service';
import { QrSseEvent } from './types/qr-sse.types';

@ApiTags('QR Login')
@Controller('auth/qr')
export class QrLoginController {
	constructor(
		private readonly qrLoginService: QrLoginService,
		private readonly configService: ConfigService,
	) {}

	/**
	 * Initiate QR login
	 *
	 * @remarks Generates a QR code ID and its expiration time for login.
	 */
	@Get('initiate')
	@ApiOkResponse({ type: QrIdDto })
	public async initiate(): Promise<QrIdDto> {
		return await this.qrLoginService.initiateQrLogin();
	}

	/**
	 * Stream QR login status
	 *
	 * @remarks Streams real-time updates on the status of a QR login attempt. Clients can subscribe to this endpoint using Server-Sent Events (SSE) to receive updates on whether the QR login has been approved, expired, or is still pending.
	 */
	@Sse('stream')
	public streamQrStatus(@Query('qrId') qrId: string): Observable<QrSseEvent> {
		return this.qrLoginService.subscribeToQrStatus(qrId);
	}

	/**
	 * Approve QR login
	 *
	 * @remarks Approves a QR login attempt for the authenticated user.
	 */
	@Post('approve')
	@Auth()
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.AUTH.QR_LOGIN_APPROVED)
	@HttpCode(HttpStatus.OK)
	public async approve(
		@Body('qrId') qrId: string,
		@Authorized() user: User,
	): Promise<MessageResponse> {
		return await this.qrLoginService.approveQrLogin(qrId, user.id);
	}

	/**
	 * QR Status Check
	 *
	 * @remarks Checks the status of a QR login attempt and finalizes the login if approved.
	 */
	@Get('status')
	@ApiOkResponse({ type: QrStatusDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.USER.NOT_FOUND)
	public async getStatus(
		@Query('qrId') qrId: string,
		@ClientInfo() clientInfo: ClientInfoDto,
		@Res({ passthrough: true }) res: Response,
	): Promise<QrStatusDto> {
		const { status, accessToken, refreshToken } =
			await this.qrLoginService.finalizeQrLogin(qrId, clientInfo);

		if (status === 'success') {
			if (accessToken && refreshToken) {
				setAuthCookies(res, accessToken, refreshToken, this.configService);
			}

			return { status: 'success' };
		}

		return { status };
	}
}
