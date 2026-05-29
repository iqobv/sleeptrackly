import type { User } from '@generated/prisma/client';
import { Auth, Authorized, ClientInfo } from '@libs/decorators';
import { ClientInfoDto } from '@libs/dto';
import { setAuthCookies } from '@libs/utils';
import { Body, Controller, Get, Post, Query, Res, Sse } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import type { Response } from 'express';
import { QrIdDto, QrStatusDto } from './dto';
import { QrLoginService } from './qr-login.service';

@Controller('auth/qr')
export class QrLoginController {
	constructor(
		private readonly qrLoginService: QrLoginService,
		private readonly configService: ConfigService,
	) {}

	@ApiOperation({
		summary: 'Initiate QR login',
		description: 'Generates a QR code ID and its expiration time for login.',
	})
	@ApiOkResponse({ type: QrIdDto })
	@Get('initiate')
	async initiate() {
		return await this.qrLoginService.initiateQrLogin();
	}

	@ApiOperation({
		summary: 'Stream QR login status',
		description:
			'Streams real-time updates on the status of a QR login attempt.',
	})
	@Sse('stream')
	streamQrStatus(@Query('qrId') qrId: string) {
		return this.qrLoginService.subscribeToQrStatus(qrId);
	}

	@ApiOperation({
		summary: 'Approve QR login',
		description: 'Approves a QR login attempt for the authenticated user.',
	})
	@ApiOkResponse({ example: { success: true } })
	@Post('approve')
	@Auth()
	async approve(@Body('qrId') qrId: string, @Authorized() user: User) {
		return await this.qrLoginService.approveQrLogin(qrId, user.id);
	}

	@ApiOperation({
		summary: 'QR Status Check',
		description:
			'Checks the status of a QR login attempt and finalizes the login if approved.',
	})
	@ApiOkResponse({ type: QrStatusDto })
	@Get('status')
	async getStatus(
		@Query('qrId') qrId: string,
		@ClientInfo() clientInfo: ClientInfoDto,
		@Res({ passthrough: true }) res: Response,
	) {
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
