import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
} from '@libs/decorators/api-response.decorator';
import { ClientInfo } from '@libs/decorators/client-info.decorator';
import { ClientInfoDto } from '@libs/dto/client-info.dto';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { CookieService } from '../cookie/cookie.service';
import { ConfirmationDto } from './dto/confirmation.dto';
import { ResendEmailDto } from './dto/resend-email.dto';
import { EmailConfirmationService } from './email-confirmation.service';

@ApiTags('Email Confirmation')
@Controller('auth/email-confirmation')
export class EmailConfirmationController {
	constructor(
		private readonly emailConfirmationService: EmailConfirmationService,
		private readonly cookieService: CookieService,
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

		this.cookieService.setAuthCookies(res, accessToken, refreshToken);

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
