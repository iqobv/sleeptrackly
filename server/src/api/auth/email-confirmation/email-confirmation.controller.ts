import { ClientInfo } from '@libs/decorators';
import { ClientInfoDto } from '@libs/dto';
import { setAuthCookies } from '@libs/utils';
import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { ConfirmationDto, ResendEmailDto } from './dto';
import { EmailConfirmationService } from './email-confirmation.service';

@ApiTags('Email Confirmation')
@Controller('auth/email-confirmation')
export class EmailConfirmationController {
	constructor(
		private readonly emailConfirmationService: EmailConfirmationService,
		private readonly configService: ConfigService,
	) {}

	@ApiOperation({ summary: 'Email confirmation' })
	@Post()
	@HttpCode(HttpStatus.OK)
	async newVerification(
		@Body() dto: ConfirmationDto,
		@ClientInfo() clientInfo: ClientInfoDto,
		@Res({ passthrough: true }) res: Response,
	) {
		const { accessToken, refreshToken } =
			await this.emailConfirmationService.newVerification(dto, clientInfo);

		setAuthCookies(res, accessToken, refreshToken, this.configService);
	}

	@ApiOperation({ summary: 'Resend email confirmation' })
	@Post('resend')
	async sendVerificationEmail(@Body() dto: ResendEmailDto) {
		return await this.emailConfirmationService.sendVerificationEmail(dto);
	}
}
