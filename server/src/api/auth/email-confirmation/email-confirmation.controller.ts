import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
	ClientInfo,
} from '@libs/decorators';
import { ClientInfoDto } from '@libs/dto';
import { MessageResponse } from '@libs/types';
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
import { ApiTags } from '@nestjs/swagger';
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

	/** Verify Email */
	@Post()
	@ApiSuccessResponse(
		HttpStatus.OK,
		SUCCESS_MESSAGES.EMAIL_CONFIRMATION.VERIFIED,
	)
	@ApiErrorResponse(HttpStatus.NOT_FOUND, [
		ERROR_MESSAGES.TOKEN.NOT_FOUND,
		ERROR_MESSAGES.TOKEN.EXPIRED,
		ERROR_MESSAGES.USER.NOT_FOUND,
	])
	@HttpCode(HttpStatus.OK)
	public async verifyEmail(
		@Body() dto: ConfirmationDto,
		@ClientInfo() clientInfo: ClientInfoDto,
		@Res({ passthrough: true }) res: Response,
	): Promise<MessageResponse> {
		const { accessToken, refreshToken } =
			await this.emailConfirmationService.verifyEmail(dto, clientInfo);

		setAuthCookies(res, accessToken, refreshToken, this.configService);

		return SUCCESS_MESSAGES.EMAIL_CONFIRMATION.VERIFIED;
	}

	/** Resend Confirmation Email */
	@Post('resend')
	@ApiSuccessResponse(
		HttpStatus.OK,
		SUCCESS_MESSAGES.EMAIL_CONFIRMATION.EMAIL_SENT,
	)
	@HttpCode(HttpStatus.OK)
	public async sendVerificationEmail(
		@Body() dto: ResendEmailDto,
	): Promise<MessageResponse> {
		return await this.emailConfirmationService.sendVerificationEmail(dto);
	}
}
