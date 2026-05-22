import type { User } from '@generated/prisma/client';
import { Auth, Authorized, ClientInfo } from '@libs/decorators';
import { ClientInfoDto } from '@libs/dto';
import { setAuthCookies } from '@libs/utils';
import { Body, Controller, Get, Post, Query, Res, Sse } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';
import { QrLoginService } from './qr-login.service';

@Controller('auth/qr')
export class QrLoginController {
	constructor(
		private readonly qrLoginService: QrLoginService,
		private readonly configService: ConfigService,
	) {}

	@Get('initiate')
	async initiate() {
		return await this.qrLoginService.initiateQrLogin();
	}

	@Sse('stream')
	streamQrStatus(@Query('qrId') qrId: string) {
		return this.qrLoginService.subscribeToQrStatus(qrId);
	}

	@Post('approve')
	@Auth()
	async approve(@Body('qrId') qrId: string, @Authorized() user: User) {
		return await this.qrLoginService.approveQrLogin(qrId, user.id);
	}

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
