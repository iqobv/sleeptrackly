import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { User } from '@prisma/client';
import type { Request } from 'express';
import { Auth, Authorized } from 'src/libs/decorators';
import { QrLoginService } from './qr-login.service';

@Controller('auth/qr')
export class QrLoginController {
	constructor(private readonly qrLoginService: QrLoginService) {}

	@Get('initiate')
	async initiate() {
		return await this.qrLoginService.initiateQrLogin();
	}

	@Post('approve')
	@Auth()
	async approve(@Body('qrId') qrId: string, @Authorized() user: User) {
		return await this.qrLoginService.approveQrLogin(qrId, user.id);
	}

	@Get('status')
	async getStatus(@Query('qrId') qrId: string, @Req() req: Request) {
		return await this.qrLoginService.finalizeQrLogin(qrId, req);
	}
}
