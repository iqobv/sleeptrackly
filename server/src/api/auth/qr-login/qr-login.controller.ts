import type { User } from '@generated/prisma/client';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
} from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { ClientInfo } from '@libs/decorators/client-info.decorator';
import { ClientInfoDto } from '@libs/dto/client-info.dto';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import type { Response } from 'express';
import { Observable } from 'rxjs';
import { CookieService } from '../cookie/cookie.service';
import { QrIdDto } from './dto/qr-id.dto';
import { QrStatusDto } from './dto/qr-status.dto';
import { QrLoginService } from './qr-login.service';
import { QrSseEventDto } from './types/qr-sse.types';

@ApiTags('QR Login')
@Controller('auth/qr')
export class QrLoginController {
	constructor(
		private readonly qrLoginService: QrLoginService,
		private readonly cookieService: CookieService,
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
	public streamQrStatus(
		@Query('qrId') qrId: string,
	): Observable<QrSseEventDto> {
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
				this.cookieService.setAuthCookies(res, accessToken, refreshToken);
			}

			return plainToInstance(QrStatusDto, { status: 'success' });
		}

		return plainToInstance(QrStatusDto, { status });
	}
}
